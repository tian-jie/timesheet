import {
  ApiController,
  BaseApiController,
  InjectRepositoryService,
  RepositoryService,
} from "../../core/modules/api-controller";
import { PageEntity } from "../../entities";

@ApiController({
  apiPrefix: "pages",
})
export class PageController extends BaseApiController<PageEntity> {
  constructor(
    @InjectRepositoryService(PageEntity)
    private readonly pageRepositoryService: RepositoryService<PageEntity>,
  ) {
    super(pageRepositoryService);
  }
}
