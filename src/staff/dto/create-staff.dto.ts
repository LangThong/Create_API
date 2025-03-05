import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  accountId: string; // Bắt buộc vì liên kết với Account

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  birthday?: Date;
}
