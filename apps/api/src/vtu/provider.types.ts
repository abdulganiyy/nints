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
  identifier: string;
  meter: string;
  amount: string;
  plan: string;
  type: 'PREPAID' | 'POSTPAID';
  reference?: string;
  mobile_number: string;
}
export interface ElectricityResponse {
  success: boolean;
  token?: string;
  reference?: string;
  message?: string;
  amount: string;
  charged: string;
  discount: string;
}

export interface CableTvRequest {
  iuc: string;
  plan: string;
  identifier: string;
  phone: string;
}

export interface CableTvResponse {
  success: boolean;
  reference?: string;
  message?: string;
  amount: string;
  charged: string;
  discount: string;
}

export interface VerifyCableTvIUCRequest {
  iuc: string;
  identifier: string;
}

export interface VerifyMeterNumberRequest {
  meter: string;
  type: string;
  plan: string;
  identifier: string;
}

export interface VtuTransactionResponse {
  success: boolean;
  status: string;
  providerReference?: string;
  message?: string;
}
