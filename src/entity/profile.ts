import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { User } from './user';
import { DeliveryAddress } from './delivery-address';
import { BaseEntity } from './base-entity';

@Entity()
export class Profile extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'timestamp', nullable: true })
  birthday?: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => DeliveryAddress, (delivery) => delivery.profile, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  deliveryAddresses: DeliveryAddress[];
}
