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
  VerifyMeterNumberRequest,
  VerifyCableTvIUCRequest,
} from './provider.types';

export abstract class VtuProvider {
  abstract readonly name: string;

  abstract purchaseAirtime(request: AirtimeRequest): Promise<AirtimeResponse>;

  abstract purchaseData(request: DataRequest): Promise<DataResponse>;

  abstract getDataPlans(): Promise<any>;

  abstract rechargeElectricity(
    request: ElectricityRequest,
  ): Promise<ElectricityResponse>;

  abstract rechargeCableTV(request: CableTvRequest): Promise<CableTvResponse>;

  abstract getCableTVPlans(): Promise<any>;

  abstract getElectricityPlans(): Promise<any>;

  abstract verifyCableIUC(request: VerifyCableTvIUCRequest): Promise<any>;

  abstract verifyMeterNumber(request: VerifyMeterNumberRequest): Promise<any>;

  //   getTransaction(transactionId: string): Promise<VtuTransactionResponse>;

  //   verifyTransaction(reference: string): Promise<VtuTransactionResponse>;
}
