import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    name: 'id',
  })
  id: number;

  @ApiProperty({
    name: 'created',
    description: 'The date that the product created',
  })
  created: Date;

  @ApiProperty({
    name: 'name',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    name: 'name',
    description: 'The name of the product',
  })
  price: number;
}
