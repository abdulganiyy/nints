import {
  Controller,
  Headers,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, type Response } from 'express';

import { PaystackWebhookService } from './paystack-webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly paystackWebhookService: PaystackWebhookService,
  ) {}

  @Post('paystack')
  async handlePaystackWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('x-paystack-signature') signature: string,
    @Res() res: Response,
  ) {

    if (!signature) {
      throw new UnauthorizedException('Missing Paystack signature');
    }

    await this.paystackWebhookService.handle(req.rawBody, req.body, signature);

    return res.status(200).json({
      status: true,
    });
  }
}
