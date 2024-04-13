import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Product } from './product';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}