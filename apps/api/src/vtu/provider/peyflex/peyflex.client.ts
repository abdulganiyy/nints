import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import {
  AirtimeRequest,
  AirtimeResponse,
  DataRequest,
  DataResponse,
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
}
