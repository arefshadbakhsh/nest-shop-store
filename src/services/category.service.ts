import { Injectable } from '@nestjs/common';
import { BaseService } from './base-service';
import { Category } from '../entity/category';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRequestDto } from '../dto/category/create-category-request-dto';
import { CategoryResponseDto } from '../dto/category/category-response-dto';
import { Transactional } from 'typeorm-transactional';
import { UpdateCategoryRequestDto } from '../dto/category/update-category-request-dto';
import { CategoryRepository } from '../repository/category-repository';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category) categoryRepository: CategoryRepository,
  ) {
    super(categoryRepository);
  }

  @Transactional()
  async createCategory(body: CreateCategoryRequestDto) {
    const instance = this.repository.create(body);
    const category = await this.repository.save(instance);
    return this.convertToCategoryResponseDto(category);
  }

  @Transactional()
  async updateCategory(categoryId: number, body: UpdateCategoryRequestDto) {
    const category = await this.findById(categoryId);
    category.name = body.name;
    const res = await this.repository.save(category);
    return this.convertToCategoryResponseDto(res);
  }

  convertToCategoryResponseDto(category: Category): CategoryResponseDto {
    return {
      name: category.name,
      id: category.id,
    };
  }
}
