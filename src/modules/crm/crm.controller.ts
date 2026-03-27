import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  // Customers endpoints
  @Post('customers')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.crmService.createCustomer(createCustomerDto);
  }

  @Get('customers')
  findAllCustomers() {
    return this.crmService.findAllCustomers();
  }

  @Get('customers/:id')
  findOneCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.findOneCustomer(id);
  }

  @Put('customers/:id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.crmService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('customers/:id')
  removeCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.removeCustomer(id);
  }

  // Suppliers endpoints
  @Post('suppliers')
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.crmService.createSupplier(createSupplierDto);
  }

  @Get('suppliers')
  findAllSuppliers() {
    return this.crmService.findAllSuppliers();
  }

  @Get('suppliers/:id')
  findOneSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.findOneSupplier(id);
  }

  @Put('suppliers/:id')
  updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.crmService.updateSupplier(id, updateSupplierDto);
  }

  @Delete('suppliers/:id')
  removeSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.removeSupplier(id);
  }
}