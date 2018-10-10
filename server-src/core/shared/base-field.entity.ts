import { PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseFieldEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
