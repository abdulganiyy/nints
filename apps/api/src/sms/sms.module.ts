import { Module } from '@nestjs/common';
import { SmsProvider } from './sms.interface';
import { TermiiSmsService } from './providers/termii.provider';

@Module({
  providers: [
    {
      provide: SmsProvider,
      useClass: TermiiSmsService,
    },
  ],
  exports: [SmsProvider],
})
export class SmsModule {}
