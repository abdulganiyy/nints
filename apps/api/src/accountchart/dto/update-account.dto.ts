import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";

import { AccountType } from "../../../generated/prisma";

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType;

  @IsNumber()
  balance!: number;
}