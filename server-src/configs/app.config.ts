import _ from "lodash";
import { readFileAsString } from "../1.core/utils";

const {
  env: {
    ENVIRONMENT,
    PORT,
    OPENSHIFT_NODEJS_PORT,

    HTTPS_CERT_PATH,
    HTTPS_KEY_PATH,

    DATABASE_HOST,
    DATABASE_INSTANCE,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,

    COOKIE_SECRET,
    SESSION_SECRET,
  },
} = process;

export const APP_CONFIG = {
  ENVIRONMENT: _.toString(ENVIRONMENT),
  PORT: _.toNumber(OPENSHIFT_NODEJS_PORT || PORT),

  HTTPS_CERT: readFileAsString(HTTPS_CERT_PATH),
  HTTPS_KEY: readFileAsString(HTTPS_KEY_PATH),

  DATABASE_HOST: _.toString(DATABASE_HOST),
  DATABASE_INSTANCE: _.toString(DATABASE_INSTANCE),
  DATABASE_NAME: _.toString(DATABASE_NAME),
  DATABASE_PASSWORD: _.toString(DATABASE_PASSWORD),
  DATABASE_PORT: _.toNumber(DATABASE_PORT),
  DATABASE_USERNAME: _.toString(DATABASE_USERNAME),

  COOKIE_SECRET: _.toString(COOKIE_SECRET),
  SESSION_SECRET: _.toString(SESSION_SECRET),
};
