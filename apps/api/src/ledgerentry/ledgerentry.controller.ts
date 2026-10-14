
import {
    Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import { LedgerEntriesService } from "./ledgerentry.service";
import { CreateLedgerEntryDto } from "./dto/create-ledger-entry.dto";
import { QueryLedgerEntriesDto } from "./dto/query-ledger-entries.dto";

@Controller("admin/accounting/ledger-entries")
export class LedgerEntriesController {
  constructor(
    private readonly ledgerEntriesService: LedgerEntriesService,
  ) {}


   @Post()
  create(@Body() dto: CreateLedgerEntryDto) {
    console.log(dto)
    return this.ledgerEntriesService.create(dto);
  }

  @Post(":id/reverse")
  reverse(
    @Param("id") id: string,
    @Body("reason") reason: string,
  ) {
    return this.ledgerEntriesService.reverse(id, reason);
  }

  @Get()
  findAll(@Query() query: QueryLedgerEntriesDto) {
    return this.ledgerEntriesService.findAll(query);
  }

  @Get("summary")
  getSummary() {
    return this.ledgerEntriesService.getSummary();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ledgerEntriesService.findOne(id);
  }
}
