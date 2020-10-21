import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Restaurant from './Restaurant';
import Product from './Product';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.images)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => Product, product => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}