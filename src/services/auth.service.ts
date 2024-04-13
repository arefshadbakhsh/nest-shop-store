import { HttpException, Injectable } from '@nestjs/common';
import { LoginRequestDto } from '../dto/user/login-request.dto';
import { RegisterRequestDto } from '../dto/user/register-request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/user';
import { UserService } from './user.service';
import { HashService } from '../shared/hash.service';
import { AuthResponseDto } from '../dto/user/auth-response-dto';
import { Transactional } from "../shared/transactional";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async login(body: LoginRequestDto): Promise<AuthResponseDto> {
    const user = await this.userService.findUserByEmail(body.email);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await this.hashService.isMatch(
      body.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new Error('Password not match');
    }
    return this.signToken(user);
  }

  @Transactional()
  async register(body: RegisterRequestDto): Promise<AuthResponseDto> {
    const checkUser = await this.userService.findUserByEmail(body.email);
    if (checkUser) {
      throw new HttpException(
        { message: 'Email already exists', key: 'DUPLICATE_USER' },
        400,
      );
    }

    const hashedPassword = await this.hashService.encrypt(body.password);
    const user = await this.userService.createUserWithProfile({
      ...body,
      password: hashedPassword,
    });
    return this.signToken(user);
  }

  private async signToken(user: User): Promise<AuthResponseDto> {
    const payload = { id: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
