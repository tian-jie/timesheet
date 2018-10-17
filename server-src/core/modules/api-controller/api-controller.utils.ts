import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { FactoryProvider } from "@nestjs/common/interfaces";
import { getRepositoryToken } from "@nestjs/typeorm";
import _ from "lodash";
import { PREFIX_PATH_ENUM, REQUEST_METHOD_ENUM } from "../../shared/enums";
import { IApiControllerConfig, IApiControllerRouteConifg } from "./interfaces";
import { RepositoryService } from "./repository.service";

export const getRepositoryServiceProviders = (entities: any[] = []) => {
  const providers: FactoryProvider[] = _.map<FactoryProvider, FactoryProvider>(
    entities,
    (entity) => ({
      inject: [getRepositoryToken(entity as any)],
      provide: getRepositoryServiceToken(entity),
      useFactory: (repository) => {
        return new RepositoryService(repository);
      },
    }),
  );
  return providers;
};

export const getRepositoryServiceToken = (entity) =>
  `${entity.name}RepositoryService`;

export const addController = (target, conifg: IApiControllerConfig) => {
  const { apiPrefix, rootPrefix } = conifg;
  let path = "";
  if (rootPrefix !== undefined) {
    path += rootPrefix;
  } else {
    path += PREFIX_PATH_ENUM.V1;
  }
  if (apiPrefix !== undefined) {
    path += apiPrefix;
  }
  Controller(path)(target);
};

export const addRoutes = (
  target,
  conifg: IApiControllerConfig,
  routes: IApiControllerRouteConifg[],
) => {
  _.forEach(routes, (route) => {
    const descriptor = Reflect.getOwnPropertyDescriptor(
      target.prototype.__proto__,
      route.action,
    );
    if (descriptor === undefined) {
      return;
    }
    if (route.method === REQUEST_METHOD_ENUM.GET) {
      Get(route.path)(target, route.action, descriptor);
    }
    if (route.method === REQUEST_METHOD_ENUM.POST) {
      Post(route.path)(target, route.action, descriptor);
    }
    if (route.method === REQUEST_METHOD_ENUM.PUT) {
      Put(route.path)(target, route.action, descriptor);
    }
    if (route.method === REQUEST_METHOD_ENUM.DELETE) {
      Delete(route.path)(target, route.action, descriptor);
    }
  });
};
