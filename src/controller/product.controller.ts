import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateProductRequestDto } from '../dto/product/create-product-request-dto';
import { ProductService } from '../services/product.service';
import { FilterProductsRequestDto } from '../dto/product/filter-products-request-dto';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProductResponseDto } from '../dto/product/product-response-dto';
import { Page } from '../model/page';
import { PaginationParams } from '../model/pagination';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 200,
    description: 'Created product successfully',
    type: ProductResponseDto, // Specify the response DTO type here
    isArray: false,
  })
  @Post('single-create')
  create(@Body() body: CreateProductRequestDto): Promise<ProductResponseDto> {
    return this.productService.createProduct(body);
  }

  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(Page) },
        {
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductResponseDto) },
            },
          },
        },
      ],
    },
  })
  @Post('filter-products')
  filterProducts(
    @Body() body: FilterProductsRequestDto,
    @Query() paginationParams: PaginationParams,
  ): Promise<Page<ProductResponseDto>> {
    return this.productService.filterProducts(body, paginationParams);
  }
}
