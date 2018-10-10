import { Module } from "@nestjs/common";
import { DATABASE_CONFIG } from "./configs";
import { PassportController } from "./controllers";
import { TestController } from "./controllers/test.controller";
import { DatabaseModule } from "./core/modules/database";
import {
  PageEntity,
  RoleEntity,
  UserEntity,
} from "./core/modules/system/entities";
import { LillyStrategyService, LocalStrategyService } from "./services";

const entities = [PageEntity, RoleEntity, UserEntity];
const providers = [LillyStrategyService, LocalStrategyService];

@Module({
  controllers: [TestController, PassportController],
  imports: [DatabaseModule.forRoot(DATABASE_CONFIG, entities)],
  providers,
})
export class AppModule {}
