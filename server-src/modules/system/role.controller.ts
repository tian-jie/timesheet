import {
  ApiController,
  BaseApiController,
  InjectRepositoryService,
  RepositoryService,
} from "../../core/modules/api-controller";
import { RoleEntity } from "../../entities";

@ApiController({
  apiPrefix: "roles",
})
export class RoleController extends BaseApiController<RoleEntity> {
  constructor(
    @InjectRepositoryService(RoleEntity)
    private readonly roleRepositoryService: RepositoryService<RoleEntity>,
  ) {
    super(roleRepositoryService);
  }
}
