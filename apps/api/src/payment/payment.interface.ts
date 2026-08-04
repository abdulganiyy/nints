export abstract class PaymentProvider {
  abstract createVirtualAccount(userId: string): Promise<any>;
  abstract provisionAccount(userId: string): Promise<any>;
}
