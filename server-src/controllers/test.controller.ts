import { Controller, Get, Request, Response } from "@nestjs/common";
import * as Express from "express";
import passport from "passport";

@Controller()
export class TestController {
  @Get("auth/callback")
  public async callback(@Request() request, @Response() response) {
    let req: Express.Request;
    let res: Express.Response;
    passport.authenticate("lilly")(request, response, () => {
      response.redirect("/");
    });
  }
}
