import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    name: 'accessToken',
  })
  accessToken: string;
}
