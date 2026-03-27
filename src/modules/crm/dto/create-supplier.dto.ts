import { IsString, IsEmail, IsOptional, IsBoolean, Length } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @Length(1, 200)
  companyName: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}