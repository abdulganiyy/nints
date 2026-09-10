export * from "./form";

export type Session = {
  user: User;
  accessToken: string;
};

export type User = {
  id: string;
  image?: string;
  email: string;
  fullname: string;
  phone?: string;
  emailVerified: boolean;
  roles: string[];
  permissions?: string[];
};

export type ResetPasswordFormData = {
  email: string;
  reset_token: string;
  new_password: string;
  new_password_confirm: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  phone: string;
  fullname: string;
  email: string;
  password: string;
};

export type TransactionStatus = "SUCCESS" | "FAILED";

export type TransactionDetail = {
  label: string;
  value: string;
};

export type TransactionResult = {
  status: TransactionStatus;
  title?: string;
  message?: string;
  reference?: string;
  amount?: string;
  details?: TransactionDetail[];
};

export const AIRTIME_NETWORKS = ["MTN", "AIRTEL", "GLO", "9MOBILE"] as const;

export type AirtimeNetwork = "MTN" | "AIRTEL" | "GLO" | "9MOBILE";

export interface AirtimeProvider {
  id: AirtimeNetwork;
  name: string;
  logo?: string;
}

export interface AirtimePurchasePayload {
  network: AirtimeNetwork;
  phoneNumber: string;
  amount: string;
}

export interface AirtimePurchaseResponse {
  success: boolean;
  status: "SUCCESS" | "FAILED";
  reference: string;
  message: string;
  amount: number;
  phoneNumber: string;
  network: AirtimeNetwork;
}
