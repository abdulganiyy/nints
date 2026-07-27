import { IsEmail, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email!: string;

  @MinLength(10)
  otp!: string;
}
