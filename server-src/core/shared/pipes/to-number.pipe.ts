import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import _ from "lodash";

@Injectable()
export class ToNumberPipe implements PipeTransform<string> {
  private nullable: boolean;

  constructor(nullable: boolean = false) {
    this.nullable = nullable;
  }

  public async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<undefined | number> {
    if (this.nullable && value === undefined) {
      return undefined;
    }
    if (!this.nullable && value === undefined) {
      throw new BadRequestException("number undefined");
    }
    return _.toNumber(value);
  }
}
