export interface EmailInput {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

export abstract class EmailService {
  abstract sendEmail(input: EmailInput): Promise<void>;
}
