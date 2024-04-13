import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product';
import { CreateProductRequestDto } from '../dto/product/create-product-request-dto';
import { ProductResponseDto } from '../dto/product/product-response-dto';
import { FilterProductsRequestDto } from '../dto/product/filter-products-request-dto';
import { BaseService } from './base-service';
import { Page } from '../model/page';
import { PaginationParams } from '../model/pagination';
import { CategoryService } from './category.service';
import { ProductRepository } from '../repository/product-repository';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private productRepository: ProductRepository,
    private categoryService: CategoryService,
    private dataSource: DataSource,
  ) {
    super(productRepository);
  }

  async createProduct(
    body: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const category = body.categoryId
      ? await this.categoryService.findById(body.categoryId)
      : null;
    const instance = this.productRepository.create({ ...body, category });
    const product = await this.productRepository.save(instance);
    return this.convertToProductResponseDto(product);
  }

  async filterProducts(
    body: FilterProductsRequestDto,
    page: PaginationParams,
  ): Promise<Page<ProductResponseDto>> {
    // const products = await this.paginate(page);
    const products = await this.paginate(page, ['category']);

    const content = products.content.map((p) =>
      this.convertToProductResponseDto(p),
    );

    // Return the new Page object with the transformed content
    return {
      ...products,
      content: content,
    };
  }

  private convertToProductResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      created: product.createdAt,
      name: product.name,
      price: product.price,
      category: product.category
        ? this.categoryService.convertToCategoryResponseDto(product.category)
        : null,
    };
  }
}
