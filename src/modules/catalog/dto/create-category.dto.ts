import { IsString, IsOptional, Length, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}