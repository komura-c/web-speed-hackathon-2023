import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { FeatureItem } from './feature_item';

@Entity()
export class FeatureSection {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id!: number;

  @Column()
  title!: string;

  @OneToMany(() => FeatureItem, (item) => item.section)
  items!: Relation<FeatureItem[]>;
}
