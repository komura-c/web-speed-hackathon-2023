import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Order } from './order';
import { Product } from './product';

@Entity()
export class ShoppingCartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product)
  product!: Relation<Product>;

  @ManyToOne(() => Order)
  order!: Relation<Order>;

  @Column()
  amount!: number;
}
