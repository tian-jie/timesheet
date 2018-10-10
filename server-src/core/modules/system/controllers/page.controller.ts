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
import { PageEntity } from "../entities";

@Controller(`${PREFIX_PATH_ENUM.V1}/pages`)
export class PageController {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
  ) {}

  @Get("/andCount")
  public async findAndCount() {
    const [pages, count] = await this.pageRepository.findAndCount({
      where: {},
    });
    return { code: 200, pages, count };
  }

  @Post()
  public async createOne(@Body("page") page: PageEntity) {
    const newPage = await this.pageRepository.save(page);
    return { code: 201, page: newPage };
  }

  @Put(":id")
  public async updateById(
    @Param("id") id: number,
    @Body("page") page: PageEntity,
  ) {
    const newPage = await this.pageRepository.update(id, page);
    return { code: 200 };
  }

  @Delete(":id")
  public async deleteById(@Param("id") id: number) {
    await this.pageRepository.delete(id);
    return { code: 204 };
  }
}
