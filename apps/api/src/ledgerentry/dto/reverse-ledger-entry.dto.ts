import {
  IsString,
  Length,
} from "class-validator";

export class ReverseLedgerEntryDto {
  @IsString()
  @Length(5, 500)
  reason!: string;
}