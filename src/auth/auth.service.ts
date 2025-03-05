import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.account.findUnique({ where: { email } });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Loại bỏ password khi trả về
      return result;
    }
  
    throw new UnauthorizedException();
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
    
  }
  async register(email: string, password: string, firstName: string, lastName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await this.prisma.account.create({
      data: {
        email,
        password: hashedPassword, // Lưu password đã hash
        firstName,
        lastName,
      },
    });
  
    return user;
  }
}
