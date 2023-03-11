import { Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Product } from './product';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id!: number;

  @OneToOne(() => Product)
  @JoinColumn()
  @Index()
  product!: Relation<Product>;
}
