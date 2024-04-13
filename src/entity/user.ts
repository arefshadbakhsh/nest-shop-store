import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from './base-entity';
import { Profile } from './profile';
import { Order } from './order';

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, profile => profile.user, { cascade: ['insert'] })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
