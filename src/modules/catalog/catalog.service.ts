import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  // ---------- Categories ----------
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['parent'] });
  }

  async findOneCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['parent', 'children'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOneCategory(id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  // ---------- Brands ----------
  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(brand);
  }

  async findAllBrands(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findOneBrand(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async updateBrand(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOneBrand(id);
    Object.assign(brand, updateBrandDto);
    return this.brandRepository.save(brand);
  }

  async removeBrand(id: number): Promise<void> {
    const result = await this.brandRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }

  // ---------- Products ----------
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // Проверяем существование связанных сущностей (опционально)
    await this.validateProductReferences(createProductDto);
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category', 'brand', 'supplier'] });
  }

  async findOneProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category', 'brand', 'supplier'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOneProduct(id);
    if (updateProductDto.categoryId || updateProductDto.brandId || updateProductDto.supplierId) {
      await this.validateProductReferences(updateProductDto);
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async removeProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  // Вспомогательный метод для проверки существования category, brand, supplier
  private async validateProductReferences(dto: any): Promise<void> {
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
      if (!category) throw new NotFoundException(`Category with ID ${dto.categoryId} not found`);
    }
    if (dto.brandId) {
      const brand = await this.brandRepository.findOne({ where: { id: dto.brandId } });
      if (!brand) throw new NotFoundException(`Brand with ID ${dto.brandId} not found`);
    }
    if (dto.supplierId) {
      // Здесь можно было бы внедрить SupplierRepository, но он в другом модуле.
      // Пока пропускаем проверку, либо потом сделаем через отдельный сервис.
      // Для простоты пока оставляем без проверки.
    }
  }
}