import { Module } from "@nestjs/common";
import { LillyStrategy } from "./lilly.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  exports: [LillyStrategy, LocalStrategy],
  providers: [LillyStrategy, LocalStrategy],
})
export class StrategyModule {}
