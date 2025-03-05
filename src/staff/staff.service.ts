import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(accountId: string, data: CreateStaffDto) {
    return this.prisma.staff.create({
      data: {
        avatar: data.avatar,
        location: data.location,
        birthday: data.birthday,
        accountId, // Liên kết với Account
      },
    });
  }

  async findAll() {
    return this.prisma.staff.findMany({ include: { account: true } });
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findUnique({ where: { id }, include: { account: true } });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  async update(id: string, data: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },
      data,
      include: { account: true },
    });
  }

  async remove(id: string) {
    return this.prisma.staff.delete({ where: { id } });
  }
}
