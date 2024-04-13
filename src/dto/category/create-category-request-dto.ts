import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequestDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of the product',
    required: true,
  })
  name: string;
}
