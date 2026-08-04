export const PAYMENT_QUEUE = 'payment';

export enum PaymentJobs {
  PROVISION_VIRTUAL_ACCOUNT = 'provision_virtual_account',
  VERIFY_TRANSACTION = 'verify-transaction',
  CREDIT_WALLET = 'credit-wallet',
  REVERSE_PAYMENT = 'reverse-payment',
  SETTLEMENT = 'settlement',
}
