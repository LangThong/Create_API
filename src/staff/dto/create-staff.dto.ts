import { IsString, IsOptional, IsEmail, IsDateString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  password: string
}
