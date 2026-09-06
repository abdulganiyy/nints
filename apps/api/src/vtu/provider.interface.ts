import {
  AirtimeRequest,
  AirtimeResponse,
  DataRequest,
  DataResponse,
  ElectricityRequest,
  ElectricityResponse,
  CableTvRequest,
  CableTvResponse,
  VtuTransactionResponse,
} from './provider.types';

export abstract class VtuProvider {
  abstract readonly name: string;

  abstract purchaseAirtime(request: AirtimeRequest): Promise<AirtimeResponse>;

  abstract purchaseData(request: DataRequest): Promise<DataResponse>;

  abstract getDataPlans(): Promise<any>;

  //   electricity(request: ElectricityRequest): Promise<ElectricityResponse>;

  //   cableTv(request: CableTvRequest): Promise<CableTvResponse>;

  //   getTransaction(transactionId: string): Promise<VtuTransactionResponse>;

  //   verifyTransaction(reference: string): Promise<VtuTransactionResponse>;
}
