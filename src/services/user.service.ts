import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from './base-service';
import { Profile } from '../entity/profile';
import { DeliveryAddress } from '../entity/delivery-address';
import { RegisterRequestDto } from '../dto/user/register-request.dto';
import { Transactional } from '../shared/transactional';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(DeliveryAddress)
    private deliveryAddressRepository: Repository<DeliveryAddress>,
    private dataSource: DataSource,
  ) {
    super(userRepository);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUserWithProfile(body: RegisterRequestDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userInstance = queryRunner.manager.create(User, {
        email: body.email,
        password: body.password,
      });
      const user = await queryRunner.manager.save(userInstance);

      const profileInstance = queryRunner.manager.create(Profile, {
        firstName: body.firstName,
        lastName: body.lastName,
        birthday: body.birthday,
        user: user, // Associate the user with the profile
        deliveryAddresses: [],
      });
      await queryRunner.manager.save(profileInstance);

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error; // Ensure any caught errors are re-thrown to be handled elsewhere
    } finally {
      await queryRunner.release();
    }
  }
}
