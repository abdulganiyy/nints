import { IsString } from 'class-validator';

export class VerifyMeterNumberDto {
  @IsString()
  meter!: string;

  @IsString()
  identifier!: string;

  @IsString()
  plan!: string;

  @IsString()
  type!: string;
}
