import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { Customer } from './customer.entity';
import { Supplier } from './supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Supplier])],
  controllers: [CrmController],
  providers: [CrmService],
})
export class CrmModule {}