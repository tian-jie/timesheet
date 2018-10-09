import { Module } from "@nestjs/common";
import { DatabaseModule } from "./1.core/modules/database";
import { StrategyModule } from "./1.core/modules/strategy/strategy.module";
import { PageEntity, RoleEntity, UserEntity } from "./1.core/modules/system/entities";
import { DATABASE_CONFIG } from "./configs";
import { PassportController } from "./controllers";
import { TestController } from "./controllers/test.controller";

const entities = [PageEntity, RoleEntity, UserEntity];
@Module({
  controllers: [PassportController, TestController],
  imports: [DatabaseModule.forRoot(DATABASE_CONFIG, entities), StrategyModule],
})
export class AppModule {}
