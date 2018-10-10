import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()

export class ParseWherePipe implements PipeTransform<string> {

    public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        return value;
    }
}
