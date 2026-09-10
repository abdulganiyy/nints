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
import { NetworkProvider } from '../provider.enum';

export class PurchaseAirtimeDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsEnum(NetworkProvider)
  network!: NetworkProvider;

  @IsString()
  @IsNotEmpty()
  @Matches(/^0[7-9][0-9]{9}$/, {
    message: 'Invalid Nigerian phone number',
  })
  phoneNumber!: string;

  @IsNumberString()
  @Min(50)
  amount!: string;
}
