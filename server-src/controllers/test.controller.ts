import { Controller, Get, Request, Response } from "@nestjs/common";
import { LoggerService } from "../core/modules/logger";
import { IRequest, IResponse } from "../core/shared/interfaces";

@Controller()
export class TestController {
  constructor(private readonly loggerService: LoggerService) {}
  @Get("test")
  public async index(
    @Request() request: IRequest,
    @Response() response: IResponse,
  ) {
    return "test";
  }
}
