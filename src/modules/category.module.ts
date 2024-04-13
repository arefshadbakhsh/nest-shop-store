import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entity/category';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controller/category.controller';
import { AuthModule } from './auth.module';
import { CategoryRepository } from '../repository/category-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
