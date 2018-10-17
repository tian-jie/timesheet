import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { HTTP_STATUS_CODE } from "../../shared/enums";
import { IResponse } from "../../shared/interfaces";
import { createResult } from "../../utils";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException | Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: IResponse = context.getResponse();
    let code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      code = exception.getStatus();
    }
    response.status(200).json(createResult(exception, code));
  }
}
