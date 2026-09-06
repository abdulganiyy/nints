import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { VtuProvider } from './provider.interface';
import { PurchaseAirtimeDto } from './dto/purchase-airtime.dto';
import { PurchaseDataDto } from './dto/purchase-data.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { AirtimeService } from './airtime.service';
import { DataService } from './data.service';

@Controller('vtu')
@UseGuards(JwtGuard)
export class VtuController {
  constructor(
    private vtuService: VtuProvider,
    private airtimeService: AirtimeService,
    private dataService: DataService,
  ) {}

  @Post('airtime')
  purchaseAirtime(@Body() dto: PurchaseAirtimeDto) {
    return this.airtimeService.purchaseAirtime(dto);
  }

  @Post('data')
  purchaseData(@Body() dto: PurchaseDataDto) {
    return this.dataService.purchaseData(dto);
  }

  @Get('dataplan')
  getDataPlans() {
    return this.vtuService.getDataPlans();
  }
}
