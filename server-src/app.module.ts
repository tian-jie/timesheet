import { Module } from "@nestjs/common";
import { DATABASE_CONFIG } from "./configs";
import { PassportController } from "./controllers";
import { TestController } from "./controllers/test.controller";
import { ApiControllerModule } from "./core/modules/api-controller";
import { DatabaseModule } from "./core/modules/database";
import { ExceptionModule } from "./core/modules/exception";
import { PageEntity, RoleEntity, UserEntity } from "./entities";
import { SystemModule } from "./modules";
import { LillyStrategyService, LocalStrategyService } from "./services";

const entities = [PageEntity, RoleEntity, UserEntity];
const providers = [LillyStrategyService, LocalStrategyService];

@Module({
  controllers: [TestController, PassportController],
  imports: [
    ExceptionModule,
    DatabaseModule.forRoot(DATABASE_CONFIG, entities),
    ApiControllerModule.forRoot(entities),
    SystemModule,
  ],
  providers,
})
export class AppModule {}
