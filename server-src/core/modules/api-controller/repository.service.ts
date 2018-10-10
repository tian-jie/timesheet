import { Injectable } from "@nestjs/common";
import _ from "lodash";
import { ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class RepositoryService<Model extends ObjectLiteral> {
  constructor(private readonly repository: Repository<Model>) {}
}
