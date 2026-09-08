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

export class PurchaseCableTVPlanDto {
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
  iuc!: string;

  @IsOptional()
  @IsNumberString()
  @Min(50)
  amount?: string;
}
