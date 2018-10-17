import { Module } from "@nestjs/common";
import { PageController } from "./page.controller";
import { RoleController } from "./role.controller";
import { UserController } from "./user.controller";

const controllers = [PageController, RoleController, UserController];

@Module({
  controllers,
})
export class SystemModule {}
