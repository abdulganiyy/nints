import { Injectable } from '@nestjs/common';
import { VtuProvider } from '../../provider.interface';
import {
  AirtimeRequest,
  AirtimeResponse,
  CableTvRequest,
  CableTvResponse,
  DataRequest,
  DataResponse,
  ElectricityRequest,
  ElectricityResponse,
  VerifyCableTvIUCRequest,
  VerifyMeterNumberRequest,
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
      amount: response.amount,
      charged: response.charged,
      discount: response.discount,
    };
  }

  async purchaseData(request: DataRequest): Promise<DataResponse> {
    const response = await this.client.purchaseData(request);

    return {
      status: response.status,
      success: response.status === 'SUCCESS',
      reference: response.requestId,
      message: response.response_description,
      amount: response.amount,
      charged: response.charged,
      discount: response.discount,
    };
  }

  getDataPlans() {
    return this.client.getDataplans();
  }

  getCableTVPlans() {
    return this.client.getCableTVplans();
  }

  getElectricityPlans() {
    return this.client.getElectricityplans();
  }

  async rechargeElectricity(
    request: ElectricityRequest,
  ): Promise<ElectricityResponse> {
    const response = await this.client.rechargeElectricity(request);

    return {
      success: response.status === 'SUCCESS',
      reference: response.requestId,
      message: response.response_description,
      amount: response.amount,
      charged: response.charged,
      discount: response.discount,
    };
  }

  async rechargeCableTV(
    request: CableTvRequest,
  ): Promise<CableTvResponse | any> {
    const response = await this.client.rechargeCableTV(request);

    return {
      status: response.status,
      success: response.status === 'SUCCESS',
      reference: response.requestId,
      message: response.response_description,
      amount: response.amount,
      charged: response.charged,
      discount: response.discount,
    };
  }

  async verifyCableIUC(request: VerifyCableTvIUCRequest): Promise<any> {
    const response = await this.client.verifyCableIUC(request);

    return {
      success: response.status === 'SUCCESS',
      reference: response.requestId,
      message: response.response_description,
      amount: response.amount,
      charged: response.charged,
      discount: response.discount,
    };
  }

  async verifyMeterNumber(request: VerifyMeterNumberRequest): Promise<any> {
    const response = await this.client.verifyMeterNumber(request);

    return {
      success: response.status === 'SUCCESS',
      reference: response.requestId,
      message: response.response_description,
      amount: response.amount,
      charged: response.charged,
      discount: response.discount,
    };
  }
}
