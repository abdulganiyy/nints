import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin/dashboard')
@UseGuards(JwtGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard() {
    return this.dashboardService.getDashboard();
  }

  @Get('overview')
  async getOverview() {
    return this.dashboardService.getOverview();
  }

  @Get('transactions')
  async getTransactionStats() {
    return this.dashboardService.getTransactionStats();
  }

  @Get('today')
  async getTodayStats() {
    return this.dashboardService.getTodayStats();
  }

  @Get('recent-transactions')
  async getRecentTransactions() {
    return this.dashboardService.getRecentTransactions();
  }
}
