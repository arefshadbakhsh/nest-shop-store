import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product';
import { Repository } from 'typeorm';
import { CreateProductRequestDto } from '../dto/product/create-product-request-dto';
import { ProductResponseDto } from '../dto/product/product-response-dto';
import { FilterProductsRequestDto } from '../dto/product/filter-products-request-dto';
import { BaseService } from './base-service';
import { Page } from '../model/page';
import { PaginationParams } from '../model/pagination';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  async createProduct(
    body: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const instance = this.productRepository.create(body);
    const product = await this.productRepository.save(instance);
    return this._convertToProductResponseDto(product);
  }

  async filterProducts(
    body: FilterProductsRequestDto,
    page: PaginationParams,
  ): Promise<Page<ProductResponseDto>> {
    const products = await this.findAll(page);

    const content = products.content.map((p) =>
      this._convertToProductResponseDto(p),
    );

    // Return the new Page object with the transformed content
    return {
      ...products,
      content: content,
    };
  }

  private _convertToProductResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      created: product.createdAt,
      name: product.name,
      price: product.price,
    };
  }
}
