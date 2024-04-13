import { Column, Entity, ManyToOne } from "typeorm";
import { Profile } from "./profile";
import { BaseEntity } from "./base-entity";


@Entity()
export class DeliveryAddress extends BaseEntity {

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => Profile, (profile) => profile.deliveryAddresses)
  profile: Profile;
}