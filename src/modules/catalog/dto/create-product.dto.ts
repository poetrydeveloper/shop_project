import { IsString, IsOptional, IsNumber, IsBoolean, Min, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 50)
  code: string;

  @IsString()
  @Length(1, 200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  purchasePrice?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  brandId: number;

  @IsNumber()
  supplierId: number;
}
