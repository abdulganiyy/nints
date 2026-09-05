import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { NetworkProvider } from '../provider.enum';

export class PurchaseAirtimeDto {
  @IsNotEmpty()
  @IsString()
  walletId!: string;

  @IsEnum(NetworkProvider)
  network!: NetworkProvider;

  @IsString()
  @IsNotEmpty()
  @Matches(/^0[7-9][0-9]{9}$/, {
    message: 'Invalid Nigerian phone number',
  })
  phoneNumber!: string;

  @IsNumber()
  @Min(50)
  amount!: number;
}
