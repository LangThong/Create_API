import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ObjectId } from 'mongodb';

@Controller('api/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto & { accountId: string }) {
    if (!ObjectId.isValid(createStaffDto.accountId)) {
      throw new BadRequestException('Invalid account ID format');
    }

    return this.staffService.create(createStaffDto.accountId, createStaffDto);
  }

  @Get()
  async findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid staff ID format');
    }
    
    const staff = await this.staffService.findOne(id);
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    
    return staff;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid staff ID format');
    }

    const updatedStaff = await this.staffService.update(id, updateStaffDto);
    if (!updatedStaff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return updatedStaff;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid staff ID format');
    }

    const deletedStaff = await this.staffService.remove(id);
    if (!deletedStaff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return { message: 'Staff deleted successfully' };
  }
}
