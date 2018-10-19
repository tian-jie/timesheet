import { Module } from "@nestjs/common";
import { RequestGuard } from "./request.guard";
import { UserGuard } from "./user.guard";

const providers = [RequestGuard, UserGuard];

@Module({
  exports: [...providers],
  providers,
})
export class AuthorityModule {}
