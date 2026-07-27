export abstract class PaymentProvider {
  abstract createVirtualAccount(userId: string): Promise<any>;
}
