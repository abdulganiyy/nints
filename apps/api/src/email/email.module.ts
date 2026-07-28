import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { BrevoProvider } from './brevo.provider';
import { EmailService } from './email.interface';

@Module({
  controllers: [],
  providers: [
    { provide: EmailService, useClass: BrevoProvider },
    TemplateService,
    BrevoProvider,
  ],
  exports: [EmailService],
})
export class EmailModule {}
