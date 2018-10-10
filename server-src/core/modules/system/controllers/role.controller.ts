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
import { RoleEntity } from "../entities";

@Controller(`${PREFIX_PATH_ENUM.V1}/roles`)
export class RoleController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  @Get("/andCount")
  public async findAndCount() {
    const [roles, count] = await this.roleRepository.findAndCount({
      relations: ["pages"],
      where: {},
    });
    return { code: 200, roles, count };
  }

  @Post()
  public async createOne(@Body("role") role: RoleEntity) {
    const newRole = await this.roleRepository.save(role);
    return { code: 201, role: newRole };
  }

  @Put(":id")
  public async updateById(
    @Param("id") id: number,
    @Body("role") role: RoleEntity,
  ) {
    const oldRole = await this.roleRepository.findOne(id);
    const newRole = await this.roleRepository.save(
      this.roleRepository.merge(oldRole as any, role),
    );
    return { code: 200 };
  }

  @Delete(":id")
  public async deleteById(@Param("id") id: number) {
    await this.roleRepository.delete(id);
    return { code: 204 };
  }
}
