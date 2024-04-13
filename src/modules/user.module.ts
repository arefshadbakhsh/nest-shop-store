import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Profile } from '../entity/profile';
import { DeliveryAddress } from '../entity/delivery-address';
import { UserRepository } from '../repository/user-repository';
import { ProfileRepository } from '../repository/profile-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, DeliveryAddress])],
  controllers: [UserController],
  providers: [UserService, UserRepository, ProfileRepository],
  exports: [UserService],
})
export class UserModule {}
