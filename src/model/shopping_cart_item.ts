import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, type Relation } from 'typeorm';

import { Order } from './order';
import { Product } from './product';

@Entity()
@Unique(['product', 'order'])
export class ShoppingCartItem {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id!: number;

  @ManyToOne(() => Product)
  product!: Relation<Product>;

  @ManyToOne(() => Order)
  order!: Relation<Order>;

  @Column()
  amount!: number;
}
