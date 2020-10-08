import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SlotEntity } from './slot_entity';

@Entity({name: "drink"})
export class DrinkEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  prefab_url: string;

  @Column()
  description: string;


  @Column()
  price: number;

  @Column()
  thumbnail_url: string;




  @OneToMany(() => SlotEntity, slotEntity => slotEntity.drink)
  slots: SlotEntity[];
}