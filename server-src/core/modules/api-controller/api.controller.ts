import { Body, Param } from "@nestjs/common";
import { ObjectLiteral } from "typeorm";
import { RepositoryService } from ".";
import { HTTP_STATUS_CODE } from "../../shared/enums";
import { IResult } from "../../shared/interfaces";
import { ToNumberPipe } from "../../shared/pipes";
import { createResult } from "../../utils";

export abstract class ApiController<Entity extends ObjectLiteral> {
  constructor(private readonly repositoryService: RepositoryService<Entity>) {}

  public async findAndCount(): Promise<IResult> {
    const [entities, count] = await this.repositoryService.findAndCount();
    return createResult({ entities, count }, HTTP_STATUS_CODE.OK);
  }

  public async find(): Promise<IResult> {
    const entities = await this.repositoryService.find();
    return createResult({ entities }, HTTP_STATUS_CODE.OK);
  }

  public async findOneById(
    @Param("id", new ToNumberPipe()) id: number,
  ): Promise<IResult> {
    const entity = await this.repositoryService.findOne(id);
    return createResult({ entity }, HTTP_STATUS_CODE.OK);
  }

  public async findOneByFilter(): Promise<IResult> {
    return createResult({ msg: "find one by filter" });
  }

  public async create(@Body("data") data: Entity[]): Promise<IResult> {
    const entities = await this.repositoryService.create(data);
    return createResult({ entities }, HTTP_STATUS_CODE.CREATED);
  }

  public async createOne(@Body("data") data: Entity): Promise<IResult> {
    const entity = await this.repositoryService.createOne(data);
    return createResult({ entity }, HTTP_STATUS_CODE.CREATED);
  }

  public async update(): Promise<IResult> {
    return createResult({ msg: "update all" });
  }

  public async updateOneById(
    @Param("id", new ToNumberPipe()) id: number,
    @Body("data") data: Entity,
  ): Promise<IResult> {
    const entity = await this.repositoryService.updateOne(id, data);
    return createResult({ entity }, HTTP_STATUS_CODE.OK);
  }

  public async updateOneByFilter(): Promise<IResult> {
    return createResult({ msg: "update one by filter" });
  }

  public async delete(): Promise<IResult> {
    return createResult({ msg: "delte all" });
  }

  public async deleteOneById(
    @Param("id", new ToNumberPipe()) id: number,
  ): Promise<IResult> {
    const entity = await this.repositoryService.deleteOne(id);
    return createResult({ entity }, HTTP_STATUS_CODE.NO_CONTENT);
  }

  public async deleteOneByFilter(): Promise<IResult> {
    return createResult({ msg: "delete one by filter" });
  }
}
