import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class AccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must have at least 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter, and be between 8-25 characters.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  staffId: string;
}
