import { REQUEST_METHOD_ENUM } from "../../../shared/enums";
import { IApiControllerRouteConifg } from "../interfaces";

export const API_CONTROLLER_ROUTES_CONFIG: IApiControllerRouteConifg[] = [
  {
    action: "findAndCount",
    method: REQUEST_METHOD_ENUM.GET,
    path: "andCount",
  },
  {
    action: "find",
    method: REQUEST_METHOD_ENUM.GET,
    path: "",
  },
  {
    action: "findOneById",
    method: REQUEST_METHOD_ENUM.GET,
    path: ":id",
  },
  {
    action: "findOneByFilter",
    method: REQUEST_METHOD_ENUM.GET,
    path: "one",
  },
  {
    action: "create",
    method: REQUEST_METHOD_ENUM.POST,
    path: "",
  },
  {
    action: "createOne",
    method: REQUEST_METHOD_ENUM.POST,
    path: "one",
  },
  {
    action: "update",
    method: REQUEST_METHOD_ENUM.PUT,
    path: "",
  },
  {
    action: "updateOneById",
    method: REQUEST_METHOD_ENUM.PUT,
    path: ":id",
  },
  {
    action: "updateOneByFilter",
    method: REQUEST_METHOD_ENUM.PUT,
    path: "one",
  },
  {
    action: "delete",
    method: REQUEST_METHOD_ENUM.DELETE,
    path: "",
  },
  {
    action: "deleteOneById",
    method: REQUEST_METHOD_ENUM.DELETE,
    path: ":id",
  },
  {
    action: "deleteOneByFilter",
    method: REQUEST_METHOD_ENUM.DELETE,
    path: "one",
  },
];
