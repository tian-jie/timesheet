import { HttpException } from "@nestjs/common";
import fs from "fs";
import _ from "lodash";
import log4js from "log4js";
import path from "path";
import { APP_CONFIG } from "../configs";
import { LoggerService } from "./modules/logger";
import { HTTP_STATUS_CODE } from "./shared/enums";
import { IResult } from "./shared/interfaces";

const { DEBUG_FOLDER, DEBUG_LEVEL } = APP_CONFIG;
const rootPath = process.cwd();

log4js.configure({
  appenders: {
    app: {
      alwaysIncludePattern: true,
      filename: DEBUG_FOLDER,
      pattern: "yyyy-MM-dd.log",
      type: "dateFile",
    },
  },
  categories: {
    default: {
      appenders: ["app"],
      level: DEBUG_LEVEL,
    },
  },
});

export const logger = log4js.getLogger();

export function getRootPath() {
  return rootPath;
}

export function getPath(...paths) {
  return path.resolve(getRootPath(), ...paths);
}

export function readFileAsString(...paths): string | undefined {
  const filePath = path.resolve(getRootPath(), ...paths);
  const isExist = fs.existsSync(filePath);
  if (isExist) {
    return fs.readFileSync(filePath).toString();
  }
  return undefined;
}

export function createResult(data: any): IResult;
export function createResult(error: Error): IResult;
export function createResult(data: any, code?: number): IResult;
export function createResult(error: Error, code?: number): IResult;
export function createResult(error: HttpException, code?: number): IResult;
export function createResult(dataOrError: any | Error, code?: number): IResult {
  let data = {};
  if (dataOrError instanceof HttpException) {
    if (code === undefined) {
      code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    }
    LoggerService.error(_.toString(dataOrError.message.message));
  } else if (dataOrError instanceof Error) {
    if (code === undefined) {
      code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    }
    LoggerService.error(_.toString(dataOrError.stack));
  } else {
    data = dataOrError;
    code = HTTP_STATUS_CODE.OK;
  }
  return { data, code };
}
