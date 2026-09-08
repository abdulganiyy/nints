import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { VtuProvider } from './provider.interface';
import { PurchaseAirtimeDto } from './dto/purchase-airtime.dto';
import { PurchaseDataDto } from './dto/purchase-data.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { AirtimeService } from './airtime.service';
import { DataService } from './data.service';
import { VerifyMeterNumberDto } from './dto/verify-meter.dto';
import { VerifyIUCDto } from './dto/verify-iuc.dto';
import { PurchaseCableTVPlanDto } from './dto/purchase-cabletv-plan.dto';
import { PurchaseElectricityDto } from './dto/purchase-electricity-plan.dto';
import { CableService } from './cable.service';
import { ElectricityService } from './electricity.service';

@Controller('vtu')
@UseGuards(JwtGuard)
export class VtuController {
  constructor(
    private vtuService: VtuProvider,
    private airtimeService: AirtimeService,
    private dataService: DataService,
    private cableService: CableService,
    private electricityService: ElectricityService,
  ) {}

  @Post('airtime')
  purchaseAirtime(@Body() dto: PurchaseAirtimeDto) {
    return this.airtimeService.purchaseAirtime(dto);
  }

  @Post('data')
  purchaseData(@Body() dto: PurchaseDataDto) {
    return this.dataService.purchaseData(dto);
  }

  @Get('meter/verify')
  verifyMeterNumber(@Query() query: VerifyMeterNumberDto) {
    return this.vtuService.verifyMeterNumber(query);
  }

  @Post('iuc/verify')
  verifyIUC(@Body() dto: VerifyIUCDto) {
    return this.vtuService.verifyCableIUC(dto);
  }

  @Post('cable')
  purchaseCableTV(@Body() dto: PurchaseCableTVPlanDto) {
    return this.cableService.rechargeCableTV(dto);
  }

  @Post('electricity')
  purchaseElectricity(@Body() dto: PurchaseElectricityDto) {
    return this.electricityService.rechargeElectricity(dto);
  }

  @Get('dataplan')
  getDataPlans() {
    return this.vtuService.getDataPlans();
  }

  @Get('electricityplan')
  getElectricityPlans() {
    return this.vtuService.getElectricityPlans();
  }

  @Get('cableplan')
  getCablePlans() {
    return this.vtuService.getCableTVPlans();
  }
}
