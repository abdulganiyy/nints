import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class PurchaseElectricityDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  identifier!: string;


  @IsString()
  @IsNotEmpty()
  plan!: string;

  @IsString()
  @IsNotEmpty()
  meter!: string;

  @IsString()
  @IsNotEmpty()
  type!: 'prepaid' | 'postpaid';

  @IsNumberString()
  @Min(1000)
  amount!: string;
}
