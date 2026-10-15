import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from "class-validator";


import { AccountType } from "../../../generated/prisma";

export class CreateAccountDto {
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z0-9_-]+$/)
  code!: string;

  @IsString()
  @Length(2, 120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsEnum(AccountType)
  type!: AccountType;

  @IsNumber()
  balance!: number;

  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;
}