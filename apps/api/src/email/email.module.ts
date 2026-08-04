import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { BrevoProvider } from './brevo.provider';
import { EmailService } from './email.interface';
import { EmailQueue } from './email.queue';
import { EmailWorker } from './email.worker';
import { BullModule } from '@nestjs/bullmq';
import { EMAIL_QUEUE } from './email.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  providers: [
    { provide: EmailService, useClass: BrevoProvider },
    TemplateService,
    BrevoProvider,
    EmailQueue,
    EmailWorker,
  ],
  exports: [EmailService, EmailQueue],
})
export class EmailModule {}
