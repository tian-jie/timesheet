import { HttpException } from "@nestjs/common";
import fs from "fs";
import _ from "lodash";
import path from "path";
import { Logger } from "./logger";
import { HTTP_STATUS_CODE } from "./shared/enums";
import { IResult } from "./shared/interfaces";

const rootPath = process.cwd();

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
    Logger.error(_.toString(dataOrError.message.message));
  } else if (dataOrError instanceof Error) {
    if (code === undefined) {
      code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    }
    Logger.error(_.toString(dataOrError.stack));
  } else {
    data = dataOrError;
    code = HTTP_STATUS_CODE.OK;
  }
  return { data, code };
}
