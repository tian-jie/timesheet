import { Injectable } from "@nestjs/common";
import _ from "lodash";
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  ObjectLiteral,
  Repository,
  SaveOptions,
} from "typeorm";
import { FindOptionsUtils } from "typeorm/find-options/FindOptionsUtils";

@Injectable()
export class RepositoryService<Entity extends ObjectLiteral> {
  constructor(private readonly repository: Repository<Entity>) {}

  public merge(
    entity: Entity,
    // tslint:disable-next-line:trailing-comma
    ...entities: Array<DeepPartial<Entity>>
  ): Entity {
    return this.repository.merge(entity, ...entities);
  }

  public async findByIds(
    ids: any[],
    options?: FindManyOptions<Entity>,
  ): Promise<Entity[]>;
  public async findByIds(
    ids: any[],
    conditions?: FindConditions<Entity>,
  ): Promise<Entity[]>;
  public async findByIds(
    ids: any[],
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity[]> {
    let isDeleted = {};
    if (FindOptionsUtils.isFindManyOptions(optionsOrConditions)) {
      isDeleted = { where: { isDeleted: false } };
    } else {
      isDeleted = { isDeleted: false };
    }
    optionsOrConditions = _.merge(isDeleted, optionsOrConditions);
    const entities = await this.repository.findByIds(ids, optionsOrConditions);
    return entities;
  }

  public async findAndCount(
    options?: FindManyOptions<Entity>,
  ): Promise<[Entity[], number]>;
  public async findAndCount(
    conditions?: FindConditions<Entity>,
  ): Promise<[Entity[], number]>;
  public async findAndCount(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<[Entity[], number]> {
    let isDeleted = {};
    if (FindOptionsUtils.isFindManyOptions(optionsOrConditions)) {
      isDeleted = { where: { isDeleted: false } };
    } else {
      isDeleted = { isDeleted: false };
    }
    optionsOrConditions = _.merge(isDeleted, optionsOrConditions);
    const [entities, count] = await this.repository.findAndCount(
      optionsOrConditions,
    );
    return [entities, count];
  }

  public async find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  public async find(conditions?: FindConditions<Entity>): Promise<Entity[]>;
  public async find(
    optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>,
  ): Promise<Entity[]> {
    let isDeleted = {};
    if (FindOptionsUtils.isFindManyOptions(optionsOrConditions)) {
      isDeleted = { where: { isDeleted: false } };
    } else {
      isDeleted = { isDeleted: false };
    }
    optionsOrConditions = _.merge(isDeleted, optionsOrConditions);
    const entities = await this.repository.find(optionsOrConditions);
    return entities;
  }

  public async findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;
  public async findOne(options?: FindOneOptions<Entity>): Promise<Entity>;
  public async findOne(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;
  public async findOne(
    optionsOrConditions?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<Entity>
      | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    let entity;
    if (FindOptionsUtils.isFindOneOptions(optionsOrConditions)) {
      optionsOrConditions = _.merge(
        { where: { isDeleted: false } },
        optionsOrConditions,
      );
    } else {
      maybeOptions = _.merge({ where: { isDeleted: false } }, maybeOptions);
    }
    entity = await this.repository.findOne(
      optionsOrConditions as any,
      maybeOptions,
    );
    if (entity === undefined) {
      entity = this.repository.create();
    }
    return entity;
  }

  public async create(
    entities: Entity[],
    options?: SaveOptions,
  ): Promise<Entity[]> {
    return await this.repository.save(entities, options);
  }

  public async createOne(
    entity: Entity,
    options?: SaveOptions,
  ): Promise<Entity> {
    return await this.repository.save(entity, options);
  }

  public async update(
    criteria:
      | string[]
      | number[]
      | Date[]
      | ObjectID[]
      | FindConditions<Entity>
      | FindManyOptions<Entity>,
    partialEntitiesOrEntity: DeepPartial<Entity> | Array<DeepPartial<Entity>>,
    options?: SaveOptions,
  ): Promise<Entity[]> {
    let entities;
    let oldEntities;
    let newEntities;
    if (_.isArray(criteria)) {
      oldEntities = await this.find({
        where: { id: criteria },
      });
    } else {
      oldEntities = await this.find(criteria);
    }
    newEntities = _.forEach(oldEntities, (oldEntity, index) =>
      this.merge(
        _.isArray(partialEntitiesOrEntity)
          ? partialEntitiesOrEntity[index]
          : partialEntitiesOrEntity,
        oldEntity,
      ),
    );
    entities = await this.repository.save(newEntities, options);
    return entities;
  }

  public async updateOne(
    criteria: string | number | Date | ObjectID | FindConditions<Entity>,
    partialEntity: DeepPartial<Entity>,
    options?: SaveOptions,
  ): Promise<Entity> {
    let entity;
    if (this.repository.metadata.manyToManyRelations.length !== 0) {
      const oldEnity = await this.findOne(criteria as any);
      entity = await this.repository.save(
        this.merge(oldEnity, partialEntity),
        options,
      );
    } else {
      await this.repository.update(criteria, partialEntity, options);
      entity = await this.findOne(criteria as any);
    }
    return entity;
  }

  public async delete(
    criteria:
      | string[]
      | number[]
      | Date[]
      | ObjectID[]
      | FindConditions<Entity>
      | FindManyOptions<Entity>,
    options?: SaveOptions,
  ): Promise<Entity[]> {
    const entities = await this.update(
      criteria,
      { isDeleted: true } as any,
      options,
    );
    return entities;
  }

  public async deleteOne(
    criteria: string | number | Date | ObjectID | FindConditions<Entity>,
    options?: SaveOptions,
  ): Promise<Entity> {
    const entity = await this.updateOne(
      criteria,
      { isDeleted: true } as any,
      options,
    );
    return entity;
  }
}
