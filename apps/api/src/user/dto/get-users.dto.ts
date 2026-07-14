import {
  IsOptional,
  IsString,
  IsInt,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleName } from '../../../generated/prisma';

export class GetUsersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsNotEmpty()
  @IsEnum(RoleName)
  roleName!: RoleName;
}
