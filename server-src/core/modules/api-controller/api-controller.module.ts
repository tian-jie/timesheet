import { DynamicModule, Global, Module } from "@nestjs/common";
import { getRepositoryServiceProviders } from "./api-controller.utils";

@Global()
@Module({})
export class ApiControllerModule {
  public static forRoot(entities: any = []): DynamicModule {
    const providers = [...getRepositoryServiceProviders(entities)];
    return {
      exports: [...providers],
      module: ApiControllerModule,
      providers,
    };
  }
}
