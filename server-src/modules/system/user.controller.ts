import {
  ApiController,
  BaseApiController,
  InjectRepositoryService,
  RepositoryService,
} from "../../core/modules/api-controller";
import { UserEntity } from "../../entities";

@ApiController({
  apiPrefix: "users",
})
export class UserController extends BaseApiController<UserEntity> {
  constructor(
    @InjectRepositoryService(UserEntity)
    private readonly userRepositoryService: RepositoryService<UserEntity>,
  ) {
    super(userRepositoryService);
  }
}
