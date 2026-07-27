export abstract class SmsProvider {
  abstract sendSms(phoneNumber: string, message: string): Promise<void>;
}
