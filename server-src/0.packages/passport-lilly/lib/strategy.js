const passport = require("passport-strategy");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const fetch = require("node-fetch");
const btoa = require("btoa");
const atob = require("atob");
const assert = require("assert");
const debug = require("debug")("node_arch:SSO");

function Strategy(options, verify) {
  if (!verify) {
    throw new TypeError("CustomStrategy requires a verify callback");
  }

  options = options || {};
  this.name = "lilly";
  this.callbackPath = options.callbackPath;
  this.successRedirect = options.successRedirect;
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
  this.nonce = options.nonce;
  this.scope = options.scope;
  this.issuer = options.issuer;
  this.authorizationURL = options.authorizationURL || `${options.issuer}/as/authorization.oauth2`;
  this.tokenURL = options.tokenURL || `${options.issuer}/as/token.oauth2`;
  this.profileURL = options.profileURL || `${options.issuer}/idp/userinfo.openid`;
  this.verify = verify;

  passport.Strategy.call(this, options);
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req, options) {
  // eslint-disable-line
  const self = this;
  if (req.path === this.callbackPath) {
    self
      .tokenEndpoint(req)
      .then((response) => {
        // store the access token, id token in session storage to access later
        req.session.access_token = response.access_token;
        req.session.refresh_token = response.refresh_token;
        req.session.id_token = response.id_token;
        var date = new Date();
        // date.setTime(date.getTime() + response.expires_in*1000)
        req.session.expired_date = date.getTime() + response.expires_in * 1000 - 5 * 60 * 1000;
        return response.id_token;
      })
      .then((idToken) => self.verifyToken(idToken, req)) // verify the id token using JWKS algorithm
      .then(([isVerified, result]) => {
        // if we're verified, set an isAuthed flag on the session for subsequent requests
        req.session.isAuthed = isVerified;

        if (isVerified) {
          const user = { id: result.sub };
          const { access_token, refresh_token } = req.session;
          // return self.verify(req, result.iss, result.sub, user,
          //   'jwtClaims', access_token, refresh_token,
          //   'params', verified);
          return self.verify(req, user, verified);
        }
        return self.redirectToAuth(req);
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "production") {
          self.redirectToAuth(req);
        } else {
          self.error(err);
        }
      });
  } else if (req.session.isAuthed) {
    self.redirectToSuccess(req);
  } else {
    self.redirectToAuth(req);
  }

  function verified(err, user, info) {
    if (err) {
      self.error(err);
      return;
    }
    if (!user) {
      self.fail(info);
      return;
    }
    self.success(user, info);
  }
};

Strategy.prototype.getJWKS = function(idToken) {
  // fetch our JWKS config to convert to public key
  return fetch(`${this.issuer}/pf/JWKS`, {
    method: "GET",
    body: "a=1",
  })
    .then((resp) => resp.json())
    .then((json) => {
      // decode our token to extract the kid to match the signature key
      const decoded = JSON.parse(atob(idToken.split(".")[0]));

      let pem;
      // check the response from JWKS config url,
      // attempt to match the kid from the token to a signature
      json.keys.forEach((key) => {
        // if this signature key's kid matches our decoded token's kid
        if (key.kid === decoded.kid) {
          // convert the JWKS signature key to a pem
          pem = jwkToPem(key);
        }
      });

      return pem;
    });
};

Strategy.prototype.verifyToken = function(idToken, req) {
  debug("verify id_token");
  return this.getJWKS(idToken)
    .then((pem) =>
      // verify the token signature with the signature we matched from JWKS
      jwt.verify(idToken, pem, {
        algorithms: "RS256",
        ignoreExpiration: true,
      }),
    )
    .then((result) => {
      if (result) {
        console.log(`SSO nonce sent:${this.nonce}`);
        console.log(`SSO nonce recieved: ${result.nonce}`);
      }
      assert.ok(!!result, "SSO Callback: validation is passed");
      assert.ok(result && result.nonce === this.nonce, "SSO Callback: nounces are equal");
      assert.ok(result && result.aud === this.clientId, "SSO Callback: clientIds are equal");
      assert.ok(result && result.iss === this.issuer, "SSO Callback: issuers are equal");
      if (
        result &&
        // Check that all the JWT verified info matches our configurated info
        result.nonce === this.nonce &&
        result.aud === this.clientId &&
        result.iss === this.issuer
      ) {
        req.session.jwt = result;
        // if everything matches, authenticate the user
        return [true, result];
      }
      return [false];
    });
};

Strategy.prototype.tokenRequest = function(req, callbackURL) {
  return fetch(this.tokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
    },
    body:
      `grant_type=authorization_code&code=${req.query.code}` +
      `&redirect_uri=${encodeURIComponent(callbackURL)}`,
  })
    .then((resp) => resp.json())
    .then((tokenResp) => Promise.resolve(tokenResp));
};

Strategy.prototype.tokenEndpoint = function(req) {
  debug("getting id_token");
  return this.getAuthCallbackURL(req).then((callbackURL) => this.tokenRequest(req, callbackURL));
};

Strategy.prototype.redirectToSuccess = function(req) {
  return this.getAuthSuccessURL(req).then((successURL) => this.redirect(successURL));
};

Strategy.prototype.redirectToAuth = function redirectToAuth(req) {
  this.getAuthCallbackURL(req).then((callback) => {
    // attempt to authenticate the user by using OpenID flow
    this.redirect(
      `${this.authorizationURL}?scope=${this.scope}` +
        `&client_id=${this.clientId}` +
        "&response_type=code" +
        `&nonce=${this.nonce}` +
        `&state=${encodeURIComponent(req.originalUrl)}` +
        `&redirect_uri=${encodeURIComponent(callback)}`,
    );
  });
};

Strategy.prototype.getAuthCallbackURL = function getAuthCallbackURL(req) {
  return new Promise((resolve) => {
    const protocol = req.get("X-Forwarded-Proto") ? req.get("X-Forwarded-Proto") : req.protocol;
    const callbackURL = `${protocol}://${req.hostname}${this.callbackPath}`;
    resolve(callbackURL);
  });
};

Strategy.prototype.getAuthSuccessURL = function getAuthSuccessURL(req) {
  return new Promise((resolve) => {
    const protocol = req.get("X-Forwarded-Proto") ? req.get("X-Forwarded-Proto") : req.protocol;
    const successURL = `${protocol}://${req.hostname}${this.successRedirect}`;
    resolve(successURL);
  });
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
