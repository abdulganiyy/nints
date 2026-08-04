import { Module } from '@nestjs/common';
import { VirtualAccountService } from './virtualaccount.service';

@Module({
  imports: [],
  providers: [VirtualAccountService],
  exports: [VirtualAccountService],
})
export class VirtualAccountModule {}
