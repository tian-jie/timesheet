import { Entity } from "typeorm";
import { BaseFieldEntity } from "../1.core/shared/base-field.entity";

@Entity({ schema: "system", name: "page-authorities" })
export class PageAuthorityEntity extends BaseFieldEntity {}
