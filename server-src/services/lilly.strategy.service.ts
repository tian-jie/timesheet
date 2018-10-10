import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "../0.packages/passport-lilly";
import { IRequest } from "../1.core/shared/interfaces";
import { LILLY_STRATEGY_CONFIG } from "../configs";

@Injectable()
export class LillyStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super(LILLY_STRATEGY_CONFIG);
  }

  public async validate(request: IRequest, lillyUser, done: Function) {
    done(null, lillyUser);
  }
}
