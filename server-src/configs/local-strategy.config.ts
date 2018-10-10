import { IStrategyOptionsWithRequest } from "passport-local";
import { APP_CONFIG } from "./app.config";

const { LOCAL_PASSWORD_FIELD, LOCAL_USERNAME_FIELD } = APP_CONFIG;

export const LOCAL_STRATEGY_CONFIG: IStrategyOptionsWithRequest = {
  passReqToCallback: true,
  passwordField: LOCAL_PASSWORD_FIELD,
  usernameField: LOCAL_USERNAME_FIELD,
};
