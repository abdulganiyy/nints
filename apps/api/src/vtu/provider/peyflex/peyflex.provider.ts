import { Injectable } from '@nestjs/common';
import { VtuProvider } from '../../provider.interface';
import {
  AirtimeRequest,
  AirtimeResponse,
  DataRequest,
  DataResponse,
  ElectricityResponse,
} from '../../provider.types';
import { PeyflexClient } from './peyflex.client';

@Injectable()
export class PeyflexProvider extends VtuProvider {
  readonly name = 'peyflex';

  constructor(private readonly client: PeyflexClient) {
    super();
  }

  async purchaseAirtime(request: AirtimeRequest): Promise<AirtimeResponse> {
    const response = await this.client.purchaseAirtime({
      mobile_number: request.mobile_number,
      amount: request.amount,
      network: request.network,
    });

    return {
      status: response.status,
      success: response.status === 'SUCCESS',
      reference: response.requestId,
      message: response.response_description,
    };
  }

  async purchaseData(request: DataRequest): Promise<DataResponse> {
    const response = await this.client.purchaseData({
      mobile_number: request.mobile_number,
      plan_code: request.plan_code,
      network: request.network,
      reference: request.reference,
    });

    return {
      success: response.code === '000',
      providerReference: response.requestId,
      message: response.response_description,
    };
  }
}
