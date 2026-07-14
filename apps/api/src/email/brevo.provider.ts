import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EmailInput, EmailService } from './email.interface';
import { TemplateService } from './template.service';

@Injectable()
export class BrevoProvider implements EmailService {
  private baseUrl = 'https://api.brevo.com/v3/smtp/email';

  constructor(private templateService: TemplateService) {}

  async sendEmail(payload: EmailInput) {
    const html = this.templateService.render(payload.template, payload.context);

    return axios.post(
      this.baseUrl,
      {
        sender: { email: process.env.MAIL_FROM },
        to: [{ email: payload.to }],
        subject: payload.subject,
        htmlContent: html,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
