import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { LILLY_STRATEGY_CONFIG } from "../configs";
import { IRequest } from "../core/shared/interfaces";
import { Strategy } from "../packages/passport-lilly";

@Injectable()
export class LillyStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super(LILLY_STRATEGY_CONFIG);
  }

  public async validate(request: IRequest, lillyUser, done: Function) {
    done(null, lillyUser);
  }
}
