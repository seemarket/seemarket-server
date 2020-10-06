import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "drink"})
export class DrinkEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  prefab_url: number;

  @Column()
  description: string;


  @Column()
  price: number;

  @Column()
  thumbnail_url: string;
}