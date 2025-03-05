import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AccountModule, PrismaModule,StaffModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
