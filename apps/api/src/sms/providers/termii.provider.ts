import { Injectable } from '@nestjs/common';
import { SmsProvider } from '../sms.interface';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TermiiSmsService implements SmsProvider {
  constructor(private readonly config: ConfigService) {}

  async sendSms(phone: string, message: string): Promise<void> {
    await axios.post('https://api.ng.termii.com/api/sms/send', {
      to: phone,
      from: this.config.get('TERMII_SENDER'),
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: this.config.get('TERMII_API_KEY'),
    });
  }
}
