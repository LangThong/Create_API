import { Controller, Post, Body, Get ,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  @Post('register')
  async register(@Body() body: { email: string; password: string; firstName: string; lastName: string }) {
    return this.authService.register(body.email, body.password, body.firstName, body.lastName);
  }
}
@Controller('api/protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard) // 👈 Yêu cầu token để truy cập
  testAuth() {
    return { message: 'Bạn đã xác thực thành công!' };
  }
}