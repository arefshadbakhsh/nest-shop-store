import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { BaseService } from './base-service';
import { Profile } from '../entity/profile';
import { DeliveryAddress } from '../entity/delivery-address';
import { RegisterRequestDto } from '../dto/user/register-request.dto';
import { UserRepository } from '../repository/user-repository';
import { ProfileRepository } from '../repository/profile-repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(Profile)
    private profileRepository: ProfileRepository,
    @InjectRepository(DeliveryAddress)
    private deliveryAddressRepository: Repository<DeliveryAddress>,
  ) {
    super(userRepository);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUserWithProfile(body: RegisterRequestDto): Promise<User> {
    const userInstance = this.userRepository.create({
      email: body.email,
      password: body.password,
    });
    const user = await this.userRepository.save(userInstance);

    const profileInstance = this.profileRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
      user: user, // Associate the user with the profile
      deliveryAddresses: [],
    });
    await this.profileRepository.save(profileInstance);
    return user;
  }
}
