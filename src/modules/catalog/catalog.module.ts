import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class CatalogModule {}