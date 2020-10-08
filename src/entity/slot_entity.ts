import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DrinkEntity } from './drink_entity';

@Entity({name: "slot"})
export class SlotEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => DrinkEntity, drinkEntity => drinkEntity.slots)
  @JoinColumn({ name: "drink_id" })
  drink: DrinkEntity;

  @Column()
  has_drink: boolean;

  @Column()
  row: number;

  @Column()
  incoming_time: Date;

  @Column()
  column: number;

  @Column()
  depth: number;
}