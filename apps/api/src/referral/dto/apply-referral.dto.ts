import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ApplyReferralDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  code!: string;
}
