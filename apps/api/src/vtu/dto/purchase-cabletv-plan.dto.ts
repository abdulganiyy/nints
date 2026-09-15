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
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  identifier!: string;

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
