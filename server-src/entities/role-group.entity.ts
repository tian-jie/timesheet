import { Entity } from "typeorm";
import { BaseFieldEntity } from "../1.core/shared/base-field.entity";

@Entity({ schema: "system", name: "role-groups" })
export class RoleGroupEntity extends BaseFieldEntity {}
