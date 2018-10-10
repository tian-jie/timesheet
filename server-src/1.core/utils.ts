import fs from "fs";
import _ from "lodash";
import path from "path";

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
