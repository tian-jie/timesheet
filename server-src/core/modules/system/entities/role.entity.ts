import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseFieldEntity } from "../../../shared/base-field.entity";
import { PageEntity } from "./page.entity";

@Entity({ schema: "system", name: "roles" })
export class RoleEntity extends BaseFieldEntity {
  @Column("varchar", { length: 100 })
  public name: string;

  @Column("varchar", { nullable: true, length: 500 })
  public comment: string;

  @ManyToMany(() => PageEntity)
  @JoinTable({
    inverseJoinColumn: {
      name: "page_id",
    },
    joinColumn: {
      name: "role_id",
    },
    name: "role-page-mapping",
  })
  public pages: PageEntity[];
}
