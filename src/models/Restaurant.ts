import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('restaurants')
export default class Rest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  opening_hours: string;

  @OneToMany(() => Image, image => image.restaurant, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'restaurant_id'})
  images: Image[];
}