import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column, CreateDateColumn} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}
