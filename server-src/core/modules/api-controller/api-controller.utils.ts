import { FactoryProvider } from "@nestjs/common/interfaces";
import { getRepositoryToken } from "@nestjs/typeorm";
import _ from "lodash";
import { RepositoryService } from "./repository.service";

export const getRepositoryServiceProviders = (entities: any[] = []) => {
  const providers: FactoryProvider[] = _.forEach(entities, (entity) => ({
    inject: [getRepositoryToken(entity as any)],
    provide: getRepositoryServiceToken(entity),
    useFactory: (repository) => {
      return new RepositoryService(repository);
    },
  }));
  return providers;
};

export const getRepositoryServiceToken = (entity) =>
  `${entity.name}RepositoryService`;
