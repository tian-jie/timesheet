import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { BaseFieldEntity } from "../../../shared/base-field.entity";
import { RoleEntity } from "./role.entity";

@Entity({ schema: "system", name: "users" })
export class UserEntity extends BaseFieldEntity {
  @Column("varchar", { length: 100 })
  public username: string;

  @Column("varchar", { length: 100 })
  public password: string;

  @Column("varchar", { name: "system_id", length: 100 })
  public systemId: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    inverseJoinColumn: {
      name: "role_id",
    },
    joinColumn: {
      name: "user_id",
    },
    name: "user-role-mapping",
  })
  public roles: RoleEntity[];
}
