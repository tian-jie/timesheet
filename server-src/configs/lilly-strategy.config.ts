import { APP_CONFIG } from "./app.config";

const {
  LILLY_CLIENT_ID,
  LILLY_CLIENT_SECRET,
  LILLY_ISSUER,
  LILLY_NONCE,
  LILLY_REDIRECT_URI,
  LILLY_SCOPE,
} = APP_CONFIG;

export const LILLY_STRATEGY_CONFIG = {
  clientId: LILLY_CLIENT_ID,
  clientSecret: LILLY_CLIENT_SECRET,
  issuer: LILLY_ISSUER,
  nonce: LILLY_NONCE,
  redirectUri: LILLY_REDIRECT_URI,
  scope: LILLY_SCOPE,
  successRedirect: "/",
};
