import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { APP_CONFIG } from "../../../configs";
import { IRequest } from "../../shared/interfaces";

@Injectable()
export class UserGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    if (APP_CONFIG.PASS_URLS.includes(request.path)) {
      return true;
    }
    if (request.user) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
