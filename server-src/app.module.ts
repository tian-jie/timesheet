import { Module } from "@nestjs/common";
import { DatabaseModule } from "./1.core/modules/database";
import {
  PageEntity,
  RoleEntity,
  UserEntity,
} from "./1.core/modules/system/entities";
import { DATABASE_CONFIG } from "./configs";
import { PassportController } from "./controllers";
import { LillyStrategyService } from "./services";

const entities = [PageEntity, RoleEntity, UserEntity];
const providers = [LillyStrategyService];

@Module({
  controllers: [PassportController],
  imports: [DatabaseModule.forRoot(DATABASE_CONFIG, entities)],
  providers,
})
export class AppModule {}
