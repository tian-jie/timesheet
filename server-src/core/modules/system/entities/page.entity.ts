import { Column, Entity } from "typeorm";
import { BaseFieldEntity } from "../../../shared/base-field.entity";

@Entity({ schema: "system", name: "pages" })
export class PageEntity extends BaseFieldEntity {
  @Column("varchar", { length: 100 })
  public name: string;

  @Column("varchar", { name: "page_url", length: 500 })
  public pageUrl: string;

  @Column("varchar", { nullable: true, length: 500 })
  public comment: string;
}
