import { Inject } from "@nestjs/common";
import { getRepositoryServiceToken } from "../api-controller.utils";

export const InjectRepositoryService = (entity) =>
  Inject(getRepositoryServiceToken(entity));
