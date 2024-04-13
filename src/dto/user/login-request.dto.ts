import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail } from "class-validator";


export class LoginRequestDto {

  @ApiProperty({
    name: 'email',
    required: true
  })
  @IsEmail()
  email: string

  @ApiProperty({
    name: 'password',
    required: true
  })
  password: string
}