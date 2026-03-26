import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Supplier } from './supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Supplier])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class CrmModule {}