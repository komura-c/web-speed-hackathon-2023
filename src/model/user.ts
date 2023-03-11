import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Order } from './order';
import { Profile } from './profile';
import { Review } from './review';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Relation<Profile>;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Relation<Review[]>;

  @OneToMany(() => Order, (item) => item.user)
  orders!: Relation<Order[]>;
}
