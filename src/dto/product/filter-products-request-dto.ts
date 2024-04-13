import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterProductsRequestDto {
  @ApiProperty({
    name: 'name',
    description: 'The name of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    name: 'minPrice',
    description: 'The minimum price of the product',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @ApiProperty({
    name: 'maxPrice',
    description: 'The maximum price of the product',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  maxPrice?: number;
}
