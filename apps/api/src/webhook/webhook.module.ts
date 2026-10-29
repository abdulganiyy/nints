import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { PaystackWebhookService } from './paystack-webhook.service';
import { ReferralModule } from '../referral/referral.module';

@Module({
  imports:[ReferralModule],
  providers: [PaystackWebhookService],
  exports: [],
  controllers: [WebhookController],
})
export class WebhookModule {}
