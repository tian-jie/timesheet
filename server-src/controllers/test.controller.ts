import { Controller, Get, Request, Response } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryService } from "../core/modules/api-controller";
import { UserEntity } from "../core/modules/system/entities";
import { IRequest, IResponse } from "../core/shared/interfaces";

@Controller()
export class TestController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get("test")
  public async index(
    @Request() request: IRequest,
    @Response() response: IResponse,
  ) {
    const user = await this.userRepository.find();
    return "test";
  }
}
