import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../entity/category';
import { CategoryRepository } from '../../repository/category-repository';
import { CategoryResponseDto } from '../category/category-response-dto';

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

  @ApiProperty({
    name: 'categoryId',
    description: 'Product category',
    required: false,
  })
  category?: CategoryResponseDto;
}
