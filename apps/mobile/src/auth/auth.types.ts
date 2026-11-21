export interface RegisterDto {
  fullname: string;
  email: string;
  phone: string;
  agreed:boolean;

}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  otp: string;
}

export interface CreatePinDto {
  pin: string;
}

export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  status: string;
  hasCompletedOnboarding:boolean;

}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}