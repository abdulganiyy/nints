import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';

@Module({
  providers: [OtpService],
  exports: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
