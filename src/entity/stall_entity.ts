import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "stall"})
export class StallEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

}