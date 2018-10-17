import { Controller, Get, Request, Response } from "@nestjs/common";
import { IRequest, IResponse } from "../core/shared/interfaces";

@Controller()
export class TestController {
  @Get("test")
  public async index(
    @Request() request: IRequest,
    @Response() response: IResponse,
  ) {
    return "test";
  }
}
