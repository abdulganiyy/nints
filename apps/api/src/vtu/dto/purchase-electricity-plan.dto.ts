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

  // @IsString()
  // @IsNotEmpty()
  // @Matches(/^0[7-9][0-9]{9}$/, {
  //   message: 'Invalid Nigerian phone number',
  // })
  // phone!: string;

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
