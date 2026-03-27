import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // Categories
  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.catalogService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.catalogService.findAllCategories();
  }

  @Get('categories/:id')
  findOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findOneCategory(id);
  }

  @Put('categories/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.catalogService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.removeCategory(id);
  }

  // Brands
  @Post('brands')
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.catalogService.createBrand(createBrandDto);
  }

  @Get('brands')
  findAllBrands() {
    return this.catalogService.findAllBrands();
  }

  @Get('brands/:id')
  findOneBrand(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findOneBrand(id);
  }

  @Put('brands/:id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.catalogService.updateBrand(id, updateBrandDto);
  }

  @Delete('brands/:id')
  removeBrand(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.removeBrand(id);
  }

  // Products
  @Post('products')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.catalogService.createProduct(createProductDto);
  }

  @Get('products')
  findAllProducts() {
    return this.catalogService.findAllProducts();
  }

  @Get('products/:id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findOneProduct(id);
  }

  @Put('products/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.catalogService.updateProduct(id, updateProductDto);
  }

  @Delete('products/:id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.removeProduct(id);
  }
}