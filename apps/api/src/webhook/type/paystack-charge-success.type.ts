export interface PaystackChargeSuccessEvent {
  event: 'charge.success';

  data: {
    id: number;

    domain: 'test' | 'live';

    status: string;

    reference: string;

    amount: number;

    currency: string;

    channel: string;

    paid_at: string;

    created_at: string;

    fees?: number;

    metadata?: unknown;

    customer?: {
      id: number;
      customer_code: string;
      email: string;
    };

    authorization?: {
      authorization_code?: string;
      channel?: string;

      sender_bank?: string;
      sender_bank_account_number?: string;
      sender_name?: string;
      sender_country?: string;

      receiver_bank_account_number?: string;
      receiver_bank?: string;
    };
  };
}
