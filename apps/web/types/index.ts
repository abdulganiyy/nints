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
  profileImage?: string;
  status?: string;
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

export interface DataPurchasePayload {
  network: string;
  phoneNumber: string;
  amount?: string;
  planCode: string;
}

export interface DataPurchaseResponse {
  success: boolean;
  status: "SUCCESS" | "FAILED";
  reference: string;
  message: string;
  amount: number;
  phoneNumber: string;
  network: AirtimeNetwork;
}

export interface CablePurchasePayload {
  identifier: string;
  iuc: string;
  amount?: string;
  plan: string;
}

export interface CablePurchaseResponse {
  success: boolean;
  status: "SUCCESS" | "FAILED";
  reference: string;
  message: string;
  amount: number;
  iucNumber: string;
  provider: string;
}

export interface ElectricityPurchasePayload {
  provider: string;
  meter: string;
  amount: string;
  plan: string;
  type: string;
}

export interface ElectricityPurchaseResponse {
  success: boolean;
  status: "SUCCESS" | "FAILED";
  reference: string;
  message: string;
  amount: number;
  meterNumber: string;
  provider: string;
}

export type ReferralStats = {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalEarned: string;
};

export type Referral = {
  id: string;
  referrer: {
    fullname: string;
    createdAt: string;
    email: string;
    phone: string;
  };
  referredUser: {
    fullname: string;
    createdAt: string;
    email: string;
    phone: string;
  };
  status: "PENDING" | "COMPLETED";
  rewards: any;
  createdAt: string;
  completedAt: string;
};

export type ReferralUser = {
  id: string;
  referredUser: {
    fullname: string;
    createdAt: string;
    email: string;
    phone: string;
  };
  status: "PENDING" | "COMPLETED";
  rewardAmount: string;
  joinedAt: string;
};

export type ReferralInfo = {
  referralCode: string;
  referralLink: string;
  // stats: ReferralStats;
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalRewards: string;
  referrals: ReferralUser[];
};

export type AccountType =
  | "ASSET"
  | "LIABILITY"
  | "EQUITY"
  | "REVENUE"
  | "EXPENSE";

export type NormalBalance = "DEBIT" | "CREDIT";

export type AccountStatus = "ACTIVE" | "INACTIVE";

export type Account = {
  id: string;
  code: string;
  name: string;
  balance:string;
  description?: string | null;
  type: AccountType;
  normalBalance: NormalBalance;
  parentId?: string | null;
  parent?: {
    id: string;
    code: string;
    name: string;
  } | null;
  status: AccountStatus;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateAccountPayload = {
  code: string;
  name: string;
  description?: string;
  type: AccountType;
  parentId?: string;
};

export type UpdateAccountPayload = Partial<CreateAccountPayload> & {
  status?: AccountStatus;
};

export type AccountQuery = {
  page?: number;
  limit?: number;
  search?: string;
  type?: AccountType | "ALL";
  status?: AccountStatus | "ALL";
};

export type AccountSummary = {
  totalAccounts: number;
  assets: number;
  liabilities: number;
  equity: number;
  revenue: number;
  expenses: number;
};

export type PaginatedAccounts = {
  data: Account[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type JournalEntryStatus = "DRAFT" | "POSTED" | "REVERSED";

export type JournalEntrySource =
  | "MANUAL"
  | "WALLET_DEPOSIT"
  | "WALLET_TRANSFER"
  | "AIRTIME_PURCHASE"
  | "DATA_PURCHASE"
  | "BILL_PAYMENT"
  | "WITHDRAWAL"
  | "LOAN_DISBURSEMENT"
  | "LOAN_REPAYMENT"
  | "REFERRAL_REWARD"
  | "FEE";

export type JournalEntryLine = {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  description?: string | null;
  debit: string;
  credit: string;
};

export type JournalEntry = {
  id: string;
  reference: string;
  description: string;
  direction: string;
  account: { type: string };
  transaction: {
    reference: string;
    description: string;
    type: string;
    status: string;
  };
  amount: string;
  source: JournalEntrySource;
  status: JournalEntryStatus;
  currency: string;
  transactionReference?: string | null;
  effectiveDate: string;
  postedAt?: string | null;
  createdAt: string;
  createdBy?: {
    id: string;
    name: string;
  } | null;
  lines: JournalEntryLine[];
  totalDebit: string;
  totalCredit: string;
};

export type JournalEntryQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: JournalEntryStatus | "ALL";
  source?: JournalEntrySource | "ALL";
  startDate?: string;
  endDate?: string;
};

export type PaginatedJournalEntries = {
  data: JournalEntry[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

export type JournalEntrySummary = {
  totalEntries: number;
  postedEntries: number;
  draftEntries: number;
  reversedEntries: number;
  totalDebits: string;
  totalCredits: string;
};

export type CreateJournalEntryPayload = {
  description: string;
  effectiveDate: string;
  currency: string;
  lines: {
    accountId: string;
    description?: string;
    direction: string;
    amount: string;
    // debit: string;
    // credit: string;
  }[];
};

export type Transaction = {
  id: string;
  description: string;
  status: string;
  createdAt:string;
};
