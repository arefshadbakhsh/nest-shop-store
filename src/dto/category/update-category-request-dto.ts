import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequestDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of the product',
    required: true,
  })
  name: string;
}
