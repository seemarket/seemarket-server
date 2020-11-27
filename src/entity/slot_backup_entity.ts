import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SlotEntity } from './slot_entity';
import { ProductEntity, ProductType } from './product_entity';

@Entity({name: "slot_backup"})
export class SlotBackupEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => ProductEntity, drinkEntity => drinkEntity.slots)
  @JoinColumn({ name: "drink_id" })
  drink: ProductEntity;

  @Column()
  has_drink: boolean;

  @Column("decimal", { precision: 10, scale: 4 })
  row: number;

  @Column("decimal", { precision: 10, scale: 4 })
  column: number;

  @Column("decimal", { precision: 10, scale: 4 })
  depth: number;

  @Column()
  incoming_time: Date;
}