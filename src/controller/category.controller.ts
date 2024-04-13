import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductRequestDto } from '../dto/product/create-product-request-dto';
import { FilterProductsRequestDto } from '../dto/product/filter-products-request-dto';
import { CategoryService } from '../services/category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('single-create')
  create(@Body() body: CreateProductRequestDto) {
    return null;
  }

  @Post('filter-products')
  filterProducts(@Body() body: FilterProductsRequestDto) {
    return null;
  }
}
