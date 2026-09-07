export interface AirtimeRequest {
  mobile_number: string;
  amount: string;
  network: string;
  reference?: string;
}

export interface AirtimeResponse {
  success: boolean;
  status: string;
  reference?: string;
  message?: string;
  amount: string;
  charged: string;
  discount: string;
}

export interface DataRequest {
  mobile_number: string;
  amount: string;
  plan_code?: string;
  network: string;
  reference?: string;
}

export interface DataResponse {
  success: boolean;
  status: string;
  reference?: string;
  message?: string;
  amount: string;
  charged: string;
  discount: string;
}

export interface ElectricityRequest {
  meterNumber: string;
  amount: number;
  disco: string;
  meterType: 'PREPAID' | 'POSTPAID';
  reference: string;
}

export interface ElectricityResponse {
  success: boolean;
  token?: string;
  providerReference?: string;
  message?: string;
}

export interface CableTvRequest {
  smartCardNumber: string;
  packageCode: string;
  provider: string;
  reference: string;
}

export interface CableTvResponse {
  success: boolean;
  providerReference?: string;
  message?: string;
}

export interface VtuTransactionResponse {
  success: boolean;
  status: string;
  providerReference?: string;
  message?: string;
}
