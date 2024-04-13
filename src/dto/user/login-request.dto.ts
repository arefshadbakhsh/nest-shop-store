import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from "class-validator";

export class LoginRequestDto {
  @ApiProperty({
    name: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    required: true,
  })
  @MinLength(8)
  password: string;
}
