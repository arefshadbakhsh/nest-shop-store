import { Module } from '@nestjs/common';
import { Product } from '../entity/product';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order';
import { OrderLine } from '../entity/order-line';
import { CategoryModule } from './category.module';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([Product, Order, OrderLine]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
