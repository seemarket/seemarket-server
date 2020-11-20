import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SlotEntity } from './slot_entity';

export enum ProductType {
  DRINK="DRINK",
  SNACK="SNACK",
  CEREAL="CEREAL",
  BOTTLE="BOTTLE",
}
@Entity({name: "product"})
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  prefab_url: string;

  @Column('text')
  description: string;

  @Column()
  price: number;

  @Column()
  thumbnail_url: string;

  @Column({
    type: "enum",
    enum: ProductType,
    default: ProductType.DRINK
  })
  product_type: ProductType

  @OneToMany(() => SlotEntity, slotEntity => slotEntity.drink)
  slots: SlotEntity[];
}