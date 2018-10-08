import { Module } from "@nestjs/common";
import { DatabaseModule } from "./1.core/modules/database";
import { DATABASE_CONFIG } from "./configs";
import { UserEntity } from "./entities";

const entities = [UserEntity];

@Module({
  imports: [DatabaseModule.forRoot(DATABASE_CONFIG, entities)],
})
export class AppModule {}
