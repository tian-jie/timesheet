import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PREFIX_PATH_ENUM } from "../../../shared/enums";
import { UserEntity } from "../entities";

@Controller(`${PREFIX_PATH_ENUM.V1}/users`)
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get("/andCount")
  public async findAndCount() {
    const [users, count] = await this.userRepository.findAndCount({
      where: {},
    });
    return { code: 200, users, count };
  }

  @Post()
  public async createOne(@Body("user") user: UserEntity) {
    const newUser = await this.userRepository.save(user);
    return { code: 201, user: newUser };
  }

  @Put(":id")
  public async updateById(
    @Param("id") id: number,
    @Body("user") user: UserEntity,
  ) {
    const oldUser = await this.userRepository.findOne(id);
    const newUser = await this.userRepository.save(
      this.userRepository.merge(oldUser as any, user),
    );
    return { code: 200 };
  }

  @Delete(":id")
  public async deleteById(@Param("id") id: number) {
    await this.userRepository.delete(id);
    return { code: 204 };
  }
}
