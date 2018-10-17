import { Module } from "@nestjs/common";
import { HttpExceptionFilter } from "./http-exception.filter";

const providers = [HttpExceptionFilter];

@Module({
  exports: providers,
  providers,
})
export class ExceptionModule {}
