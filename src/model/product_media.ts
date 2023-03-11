import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { MediaFile } from './media_file';
import { Product } from './product';

@Entity()
export class ProductMedia {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id!: number;

  @ManyToOne(() => Product)
  product!: Relation<Product>;

  @ManyToOne(() => MediaFile)
  file!: Relation<MediaFile>;

  @Column()
  isThumbnail!: boolean;
}
