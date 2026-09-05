import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { PaystackWebhookService } from './paystack-webhook.service';

@Module({
  providers: [PaystackWebhookService],
  exports: [],
  controllers: [WebhookController],
})
export class WebhookModule {}
