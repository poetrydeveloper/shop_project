import { IsString, IsEmail, IsOptional, IsBoolean, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsString()
  @Length(10, 20)
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}