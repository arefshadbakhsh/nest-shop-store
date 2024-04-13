import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderLine } from './order-line';
import { User } from './user';
import { BaseEntity } from './base-entity';

@Entity()
export class Order extends BaseEntity {
  @Column()
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];
}
