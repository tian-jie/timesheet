import { Logger as NestLogger, LoggerService } from "@nestjs/common";

export class Logger extends NestLogger implements LoggerService {}
