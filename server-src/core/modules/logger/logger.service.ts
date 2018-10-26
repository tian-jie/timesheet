import { Logger, LoggerService as ILoggerService } from "@nestjs/common";
import { logger } from "../../utils";

export class LoggerService extends Logger implements ILoggerService {
  // public static trace(message: string) {
  //   logger.trace(message);
  // }

  // public static debug(message: string) {
  //   logger.debug(message);
  // }

  // public static info(message: string) {
  //   logger.info(message);
  // }

  // public static warn(message: string) {
  //   logger.warn(message);
  // }

  // public static error(message: string) {
  //   logger.error(message);
  // }

  // public static fatal(message: string) {
  //   logger.fatal(message);
  // }

  public log(message: string) {
    super.log(message);
  }

  public warn(message: string) {
    super.warn(message);
  }

  public error(message: string, trace: string) {
    super.error(message, trace);
  }
}
