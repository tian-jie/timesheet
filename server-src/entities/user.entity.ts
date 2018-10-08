import { Column, Entity } from "typeorm";
import { BaseFieldEntity } from "../1.core/shared/base-field.entity";

@Entity({ schema: "system", name: "users" })
export class UserEntity extends BaseFieldEntity {
  @Column("varchar")
  public username: string;

  @Column("varchar")
  public password: string;

  @Column("varchar", { name: "system_id" })
  public systemId: string;
}
