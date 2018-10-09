import { Controller, Get, Request, Response } from "@nestjs/common";
import passport from "passport";
import { PREFIX_PATH_ENUM } from "../1.core/shared/enums";

@Controller(`${PREFIX_PATH_ENUM.V1}/passport`)
export class PassportController {
  @Get("local/login")
  public async localLogin(@Request() request, @Response() response) {
    passport.authenticate("local")(request, response, () => {
      response.redirect("/");
    });
  }

  @Get("lilly/login")
  public async lillyLogin(@Request() request, @Response() response) {
    passport.authenticate("lilly")(request, response, () => {
      response.redirect("/");
    });
  }

  @Get("logout")
  public async logout() {
    return "logout";
  }
}
