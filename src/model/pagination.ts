import { IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationParams {
  @ApiProperty({
    name: 'page',
    description: 'Page number to get the result, default is 1',
    required: false,
  })
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  page: number = 0;

  @ApiProperty({
    name: 'size',
    description: 'Number of element in each page',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(100)
  size: number = 10;

  @IsOptional()
  @ApiProperty({
    name: 'sort',
    description: 'The Way to sort the result, ex: name,desc or name,asc',
    required: false,
  })
  sort: string = '';

  constructor(page: number, size: number, sort: string) {
    this.page = page || 0;
    this.size = size || 10;
    this.sort = sort || '';
  }
}
