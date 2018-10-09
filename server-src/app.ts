import "reflect-metadata";

import { config } from "dotenv";
config();

import { NestApplicationOptions } from "@nestjs/common/interfaces/nest-application-options.interface";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import cookie from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import { Logger } from "./1.core/logger";
import { ENVIRONMENT_ENUM } from "./1.core/shared/enums";
import { getPath } from "./1.core/utils";
import { AppModule } from "./app.module";
import { APP_CONFIG } from "./configs";

async function bootstrap() {
  try {
    const { ENVIRONMENT, HTTPS_KEY, HTTPS_CERT, PORT, COOKIE_SECRET, SESSION_SECRET } = APP_CONFIG;
    let options: NestApplicationOptions = {};
    let port = PORT;
    if (ENVIRONMENT === ENVIRONMENT_ENUM.DEVELOPMENT) {
      if (HTTPS_KEY !== undefined && HTTPS_CERT !== undefined) {
        options = { httpsOptions: { key: HTTPS_KEY, cert: HTTPS_CERT } };
        port = 443;
      }
    }
    const app = await NestFactory.create(AppModule, options);

    app.set("trust proxy", true);

    app.use(compression());
    app.use(helmet());
    app.use(cookie(COOKIE_SECRET));
    app.use(
      session({
        cookie: { secure: true },
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
      }),
    );
    app.useStaticAssets(getPath("client"));

    await app.listen(port);
  } catch (error) {
    throw error;
  }
}

bootstrap();