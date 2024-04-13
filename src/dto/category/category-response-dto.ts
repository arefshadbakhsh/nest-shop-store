import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    name: 'id',
  })
  id: number;

  @ApiProperty({
    name: 'name',
    description: 'The name of the category',
  })
  name: string;
}
