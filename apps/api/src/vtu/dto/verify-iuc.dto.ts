import { IsInt, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyIUCDto {
  @IsString()
  iuc!: string;

  @IsString()
  identifier!: string;
}
