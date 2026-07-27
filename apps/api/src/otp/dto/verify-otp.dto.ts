import { isEnum, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OtpPurpose } from '../../../generated/prisma';

export class VerifyOtpDto {
  @IsString()
  identifier!: string;

  @IsEnum(OtpPurpose)
  purpose!: OtpPurpose;

  @IsString()
  code!: string;
}
