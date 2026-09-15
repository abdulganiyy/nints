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

export class PurchaseDataDto {
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

  @IsString()
  @IsNotEmpty()
  planCode!: string;

  @IsNumberString()
  @Min(50)
  amount!: string;
}
