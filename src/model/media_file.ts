import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['filename'])
export class MediaFile {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  id!: number;

  @Column()
  filename!: string;
}
