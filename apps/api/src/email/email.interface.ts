export interface EmailInput {
  to: string;
  subject: string;
  template: string;
  context: Record<string, string>;
}

export interface EmailService {
  sendEmail(input: EmailInput): void;
}
