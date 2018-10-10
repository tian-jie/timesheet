import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LOCAL_STRATEGY_CONFIG } from "../configs";

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super(LOCAL_STRATEGY_CONFIG);
  }

  public async validate(request, username, password, done: Function) {
    const user = {
      password,
      username,
    };
    done(null, user);
  }
}
