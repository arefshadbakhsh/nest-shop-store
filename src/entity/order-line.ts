import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderLine extends BaseEntity {
  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderLines)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderLines)
  product: Product;

}
