import { Controller, Get, Post, Request, Response } from "@nestjs/common";
import passport from "passport";
import { IRequest, IResponse } from "../core/shared/interfaces";

@Controller()
export class PassportController {
  @Post("login")
  public async localLogin(
    @Request() request: IRequest,
    @Response() response: IResponse,
  ) {
    passport.authenticate("local")(request, response, () => {
      response.redirect("/test");
    });
  }

  @Post("logout")
  public async logout() {
    return "logout";
  }

  @Get("auth/lilly/login")
  public async lillyLogin(
    @Request() request: IRequest,
    @Response() response: IResponse,
  ) {
    passport.authenticate("lilly")(request, response);
  }

  // @Get("auth/lilly/callback")
  @Get("auth/callback")
  public async lillyCallback(
    @Request() request: IRequest,
    @Response() response: IResponse,
  ) {
    passport.authenticate("lilly")(request, response, () => {
      response.redirect("/test");
    });
  }
}
