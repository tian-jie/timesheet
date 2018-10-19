import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RequestGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessRoles = this.reflector.get<string[]>(
      "accessRoles",
      context.getHandler(),
    );
    if (!accessRoles) {
      return true;
    }
    return false;
  }
}
