import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
  controllers: [StaffController],
  providers: [StaffService, PrismaService],
})
export class StaffModule {}
