import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { FilterProductsRequestDto } from '../dto/product/filter-products-request-dto';
import { CategoryService } from '../services/category.service';
import { CreateCategoryRequestDto } from '../dto/category/create-category-request-dto';
import { UpdateCategoryRequestDto } from '../dto/category/update-category-request-dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  createCategory(@Body() body: CreateCategoryRequestDto) {
    return this.categoryService.createCategory(body);
  }

  @Put('update/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateCategoryRequestDto,
  ) {
    return this.categoryService.updateCategory(Number(id), body);
  }

  @Post('filter-categories')
  filterCategories(@Body() body: FilterProductsRequestDto) {
    return null;
  }
}
