import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { ChartOfAccountsService } from "./accountchart.service";

import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { QueryAccountsDto } from "./dto/query-accounts.dto";



import { JwtGuard } from "../common/guards/jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("admin/accounting/account")
@UseGuards(JwtGuard, RolesGuard)
@Roles("ADMIN", "SUPER_ADMIN")
export class ChartOfAccountsController {
  constructor(
    private readonly chartOfAccountsService: ChartOfAccountsService,
  ) {}

  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.chartOfAccountsService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryAccountsDto) {
    return this.chartOfAccountsService.findAll(query);
  }

  @Get("summary")
async getSummary() {
  return this.chartOfAccountsService.getSummary();
}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chartOfAccountsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.chartOfAccountsService.update(id, dto);
  }


}