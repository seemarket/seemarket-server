import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "slot"})
export class SlotEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drink_id: number;

  @Column()
  has_drink: boolean;

  @Column()
  row: number;

  @Column()
  column: number;

  @Column()
  depth: number;
}