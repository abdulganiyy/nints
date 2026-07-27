import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OtpPurpose } from '../../../generated/prisma';

export class SendOtpDto {
  @IsNotEmpty()
  @IsString()
  identifier!: string;

  @IsEnum(OtpPurpose)
  purpose!: OtpPurpose;
}
