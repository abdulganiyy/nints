import { Controller, Post, Body } from '@nestjs/common';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  send(@Body() dto: SendOtpDto) {
    return this.otpService.send(dto.identifier, dto.purpose);
  }

  @Post('verify')
  async verify(@Body() dto: VerifyOtpDto) {
    await this.otpService.verify(dto.identifier, dto.purpose, dto.code);

    return {
      verified: true,
    };
  }
}
