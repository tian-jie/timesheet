import { ConnectionOptions } from "typeorm";
import { APP_CONFIG } from "./app.config";

const {
  DATABASE_NAME,
  DATABASE_INSTANCE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} = APP_CONFIG;

export const DATABASE_CONFIG: ConnectionOptions = {
  database: DATABASE_NAME,
  entities: [`${__dirname}./../entities/**.entity{.ts,.js}`],
  extra: DATABASE_INSTANCE !== undefined ? { instanceName: DATABASE_INSTANCE } : {},
  host: DATABASE_HOST,
  logging: true,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  synchronize: true,
  type: "mssql",
  username: DATABASE_USERNAME,
};
