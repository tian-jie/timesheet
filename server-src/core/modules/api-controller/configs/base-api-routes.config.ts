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
    action: "findOneByFilter",
    method: REQUEST_METHOD_ENUM.GET,
    path: "one",
  },
  {
    action: "findOneById",
    method: REQUEST_METHOD_ENUM.GET,
    path: ":id",
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
    action: "updateOneByFilter",
    method: REQUEST_METHOD_ENUM.PUT,
    path: "one",
  },
  {
    action: "updateOneById",
    method: REQUEST_METHOD_ENUM.PUT,
    path: ":id",
  },
  {
    action: "delete",
    method: REQUEST_METHOD_ENUM.DELETE,
    path: "",
  },
  {
    action: "deleteOneByFilter",
    method: REQUEST_METHOD_ENUM.DELETE,
    path: "one",
  },
  {
    action: "deleteOneById",
    method: REQUEST_METHOD_ENUM.DELETE,
    path: ":id",
  },
];
