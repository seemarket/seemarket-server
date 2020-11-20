import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './product_entity';

@Entity({name: "slot"})
export class SlotEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => ProductEntity, drinkEntity => drinkEntity.slots)
  @JoinColumn({ name: "drink_id" })
  drink: ProductEntity;

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