// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';
// import { CreateStaffDto } from './dto/create-staff.dto';
// import { UpdateStaffDto } from './dto/update-staff.dto';

// @Injectable()
// export class StaffService {
//   constructor(private prisma: PrismaService) {}

//   async create(data: CreateStaffDto) {
//     const staff = await this.prisma.staff.create({ data: {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         middleName: data.middleName,
//         email: data.email,
//         avatar: data.avatar,
//         location: data.location,
//         birthday: data.birthday
//     } });

//     const account = await this.prisma.account.create({
//         data:{
//             email: data.email,
//             password: data.password
//         }
//     })

//     return await this.prisma.staff.findUnique({where: {id: staff.id}, include: {
//         account: true
//     }})
//   }

//   async findAll() {
//     return this.prisma.staff.findMany();
//   }

//   async findOne(id: string) {
//     const staff = await this.prisma.staff.findUnique({ where: { id } });
//     if (!staff) throw new NotFoundException('Staff not found');
//     return staff;
//   }

//   async update(id: string, data: UpdateStaffDto) {
//     return this.prisma.staff.update({ where: { id }, data });
//   }

//   async remove(id: string) {
//     return this.prisma.staff.delete({ where: { id } });
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStaffDto) {
    const staff = await this.prisma.staff.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        email: data.email,
        avatar: data.avatar,
        location: data.location,
        birthday: data.birthday,
      },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.account.create({
      data: {
        email: data.email,
        password: hashedPassword,

      },
    });

    return this.prisma.staff.findUnique({
      where: { id: staff.id },
      include: { account: true },
    });
  }

  async findAll() {
    return this.prisma.staff.findMany({
      include: { account: true },
    });
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      include: { account: true },
    });
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
