import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Restaurant from './Restaurant';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.images)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}