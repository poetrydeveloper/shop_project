// catalog.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}