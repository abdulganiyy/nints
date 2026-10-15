import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ApplyReferralDto } from './dto/apply-referral.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleName } from '../../generated/prisma';
import { GetReferralsDto } from './dto/get-referrals.dto';

@Controller('referral')
@UseGuards(JwtGuard)
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Get('code')
  async getMyReferralCode(@GetUser('userId') userId: string) {
    return this.referralService.getMyReferralCode(userId);
  }

  @Get('stats')
  async getStats(@GetUser('userId') userId: string) {
    return this.referralService.getMyReferralStats(userId);
  }

  @Get()
  async getMyReferrals(@GetUser('userId') userId: string) {
    return this.referralService.getMyReferrals(userId);
  }

  @Get('rewards')
  async getMyRewards(@GetUser('userId') userId: string) {
    return this.referralService.getMyRewards(userId);
  }

  @Post('apply')
  async applyReferral(
    @GetUser('userId') userId: string,
    @Body() dto: ApplyReferralDto,
  ) {
    return this.referralService.applyReferral(userId, dto);
  }

  @Get('validate/:code')
  async validateCode(@Param('code') code: string) {
    return this.referralService.validateReferralCode(code);
  }

  @Get('admin')
@Roles(RoleName.SUPER_ADMIN)
async getAllReferrals(@Query() query:GetReferralsDto) {
  return this.referralService.getAllReferrals(query);
}
}
