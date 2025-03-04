import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AccountDto } from './dto/account.dto';
import * as bcrypt from 'bcrypt';
import { UpdateAccountDto } from './dto/update-account.dto';
@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAllAccounts() {
    return this.prisma.account.findMany(
    );
  }

  async getAccountById(accountId: string) {
    return this.prisma.account.findUnique({
      where: { id: accountId },
      select: {
        id: true,
        email: true,
        createdDate: true,
        updatedDate: true,
        staff: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async createAccount(data: AccountDto) {
    const account = await this.prisma.account.findUnique({where:{email: data.email}})
    if(account){
      throw new BadRequestException (`Account with email: ${data.email} existed`)
    }
    const staff = await this.prisma.staff.findUnique({where: {id: data.staffId}})
    if(!staff){
      throw new BadRequestException (`Staff with id: ${data.staffId} does not exist or has been removed`)
    }
    console.log("data",data)
    return await this.prisma.account.create({
      data: {
        email: data.email,
        password: data.password,
        staffId: data.staffId
      },
    });
  }
 
  // async updateAccount(accountId: string, data: UpdateAccountDto) {
  //   return this.prisma.account.update({
  //     where: { id: accountId },
  //     data,
  //     select: {
  //       id: true,
  //       email: true,
  //       createdDate: true,
  //       updatedDate: true,
  //       staff: {
  //         select: {
  //           firstName: true,
  //           lastName: true,
  //           email: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async deleteAccount(accountId: string) {
    return this.prisma.account.delete({
      where: { id: accountId },
    });
  }
}
