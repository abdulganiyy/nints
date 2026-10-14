
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { LedgerDirection } from "../../../generated/prisma";

export class CreateLedgerEntryLineDto {
  @IsString()
  @IsNotEmpty()
  accountId!: string;

  @IsEnum(LedgerDirection)
  direction!: LedgerDirection;

  @IsNumberString()
  amount!: string;
}

export class CreateLedgerEntryDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateLedgerEntryLineDto)
  lines!: CreateLedgerEntryLineDto[];
}
