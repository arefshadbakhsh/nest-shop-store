import { IsEmail, Min, MIN, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'Email of the user',
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password of the user',
    type: String,
    required: true,
  })
  @MinLength(8)
  password: string;

  @ApiProperty({
    name: 'firstName',
    description: 'First name of the user',
    type: String,
    required: true,
  })
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    description: 'Last name of the user',
    type: String,
    required: true,
  })
  lastName: string;

  @ApiProperty({
    name: 'birthday',
    description: 'Birthday of the user',
    type: Date,
    required: true,
  })
  birthday: Date;
}
