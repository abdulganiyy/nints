import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RoleName } from '../../../generated/prisma';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  fullname!: string;

  @IsNotEmpty()
  @IsEnum(RoleName)
  roleName!: RoleName;
}
