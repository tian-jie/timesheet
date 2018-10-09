import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Strategy } from "../../../0.packages/passport-lilly";
import { UserEntity } from "../system/entities";

@Injectable()
export class LillyStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      callbackPath: "/auth/callback",
      clientId: "vct8ic0nm4sgvghz",
      clientSecret: "jt81HBkCt1XvdO6YmlxSoIv2bXcaYBmO",
      issuer: "https://federate-qa.xh1.lilly.com",
      nonce: "J0c3qfwJCGIU7t6yfKSHl8qLjuyc4tx8",
      scope: "openid",
      successRedirect: "/",
    });
  }

  public async validate(request, lillyUser, done: Function) {
    // tslint:disable-next-line:no-unused-expression
    lillyUser;
    const user = await this.userRepository.findOne({
      relations: ["roles"],
      where: {},
    });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
