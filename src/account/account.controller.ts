import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { AccountService } from './account.service';
  import { AccountDto } from './dto/account.dto';
  
  @Controller('api/account')
  export class AccountController {
    constructor(private readonly accountService: AccountService) {}
  
    // Lấy tất cả tài khoản
    @Get()
    async getAllAccounts() {
      return this.accountService.getAllAccounts();
    }
  
    // Lấy tài khoản theo ID
    @Get(':accountId')
    async getAccountById(@Param('accountId') accountId: string) {
      return this.accountService.getAccountById(accountId);
    }
  
    // Tạo tài khoản mới
    @Post()
    async createAccount(@Body() accountDto: AccountDto) {
      return this.accountService.createAccount(accountDto);
    }
  
    // Cập nhật tài khoản theo ID (có thể cập nhật một hoặc nhiều trường)
    // @Patch(':accountId')
    // async updateAccount(
    //   @Param('accountId') accountId: string,
    //   @Body() updateData: Partial<AccountDto>,
    // ) {
    //   return this.accountService.updateAccount(accountId, updateData);
    // }
  
    // Xóa tài khoản theo ID
    @Delete(':accountId')
    async deleteAccount(@Param('accountId') accountId: string) {
      return this.accountService.deleteAccount(accountId);
    }
  }
  