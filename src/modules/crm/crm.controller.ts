import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../auth/user.entity';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  // Customers endpoints
  @Post('customers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.crmService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('customers/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  removeCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.removeCustomer(id);
  }

  // Suppliers endpoints
  @Post('suppliers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.crmService.updateSupplier(id, updateSupplierDto);
  }

  @Delete('suppliers/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  removeSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.removeSupplier(id);
  }
}