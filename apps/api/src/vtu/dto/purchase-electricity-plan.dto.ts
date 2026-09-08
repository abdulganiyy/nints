import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class PurchaseElectricityDto {
  @IsNotEmpty()
  @IsString()
  walletId!: string;

  @IsString()
  identifier!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^0[7-9][0-9]{9}$/, {
    message: 'Invalid Nigerian phone number',
  })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  plan!: string;

  @IsString()
  @IsNotEmpty()
  meter!: string;

  @IsString()
  @IsNotEmpty()
  type!: 'PREPAID' | 'POSTPAID';

  @IsNumberString()
  @Min(1000)
  amount!: string;
}
