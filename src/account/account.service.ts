import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AccountDto } from './dto/account.dto';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAllAccounts() {
    return this.prisma.account.findMany({
      include: { staff: true },
    });
  }

  async getAccountById(accountId: string) {
    return this.prisma.account.findUnique({
      where: { id: accountId },
      include: { staff: true },
    });
  }

  async createAccount(accountDto: AccountDto, staffDto: CreateStaffDto) {
    // Kiểm tra email đã tồn tại hay chưa
    const existingAccount = await this.prisma.account.findUnique({
      where: { email: accountDto.email },
    });
  
    if (existingAccount) {
      throw new Error('Email đã tồn tại. Vui lòng chọn email khác.');
    }
  
    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(accountDto.password, 10);
  
    // Tạo tài khoản mới
    const account = await this.prisma.account.create({
      data: {
        email: accountDto.email,
        password: hashedPassword,
        firstName: accountDto.firstName,
        lastName: accountDto.lastName,
        middleName: accountDto.middleName,
      },
    });
  
    // Tạo thông tin nhân viên liên kết với account
    const staff = await this.prisma.staff.create({
      data: {
        avatar: staffDto.avatar,
        location: staffDto.location,
        birthday: staffDto.birthday,
        accountId: account.id,
      },
    });
  
    return { account, staff };
  }
  
  async updateAccount(accountId: string, updateData: Partial<AccountDto>) {
    if (!ObjectId.isValid(accountId)) {
      throw new BadRequestException('Invalid account ID format');
    }
  
    const existingAccount = await this.prisma.account.findUnique({ where: { id: accountId } });
  
    if (!existingAccount) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
  
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
  
    return this.prisma.account.update({
      where: { id: accountId },
      data: updateData,
    });
  }

  async deleteAccount(accountId: string) {
    return this.prisma.account.delete({
      where: { id: accountId },
    });
  }
}
