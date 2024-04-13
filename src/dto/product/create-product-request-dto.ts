import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of the product',
    required: true,
  })
  name: string;

  @ApiProperty({
    name: 'price',
    description: 'The price of the product',
    required: true,
  })
  price: number;

  @ApiProperty({
    name: 'categoryId',
    description: 'Product category',
    required: false,
  })
  categoryId?: number;
}
