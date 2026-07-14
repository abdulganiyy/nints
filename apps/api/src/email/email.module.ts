import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { BrevoProvider } from './brevo.provider';

@Module({
  controllers: [],
  providers: [
    { provide: 'EmailService', useClass: BrevoProvider },
    TemplateService,
    BrevoProvider,
  ],
  exports: [BrevoProvider, 'EmailService'],
})
export class EmailModule {}
