import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
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

@Injectable()
export class PeyflexClient {
  private readonly client: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.client = axios.create({
      baseURL: 'https://client.peyflex.com.ng/api',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.configService.getOrThrow<string>('PEYFLEX_API_TOKEN')}`,
      },
    });
  }

  async purchaseAirtime(
    request: AirtimeRequest,
  ): Promise<AirtimeResponse | any> {
    const response = await this.client.post('/airtime/topup/', request);

    return response.data;
  }

  async purchaseData(request: DataRequest): Promise<DataResponse | any> {
    try {
      const response = await this.client.post('/data/purchase/', request);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response);

      throw new Error(error as string);
    }
  }

  async getDataplans() {
    const networksResponse = await this.client.get('/data/networks');

    const networks = networksResponse.data.networks;

    const plansResponses = await Promise.all(
      networks.map((network) =>
        this.client.get(`/data/plans/?network=${network.identifier}`),
      ),
    );

    return plansResponses.flatMap((response) =>
      response.data.plans.map((plan) => ({
        ...plan,
        network: response.data.network,
      })),
    );
  }

  async getCableTVplans() {
    const providersResponse = await this.client.get('/cable/providers/');

    const providers = providersResponse.data.providers;

    const plansResponses = await Promise.all(
      providers.map((provider) =>
        this.client.get(`/cable/plans/${provider.identifier}`),
      ),
    );

    return plansResponses.flatMap((response) =>
      response.data.plans.map((plan) => ({
        ...plan,
        provider: response.data.provider,
      })),
    );
  }

  async getElectricityplans() {
    const plansResponse = await this.client.get(
      '/electricity/plans/?identifier=electricity',
    );

    return plansResponse.data.plans;
  }

  async rechargeCableTV(
    request: CableTvRequest,
  ): Promise<CableTvResponse | any> {
    const response = await this.client.post('/cable/subscribe/', request);

    return response.data;
  }

  async rechargeElectricity(
    request: ElectricityRequest,
  ): Promise<ElectricityResponse | any> {
    const response = await this.client.post('/electricity/subscribe/', request);

    return response.data;
  }

  async verifyCableIUC(request: VerifyCableTvIUCRequest): Promise<any> {
    const response = await this.client.post('/cable/verify/', {
      iuc: request.iuc,
      identifier: request.identifier,
    });

    return response.data;
  }

  async verifyMeterNumber(request: VerifyMeterNumberRequest): Promise<any> {
    const response = await this.client.get(
      `/electricity/verify/?identifier=${request.identifier}&meter=${request.meter}2&plan=${request.plan}&type=${request.type}`,
    );

    return response.data;
  }
}
