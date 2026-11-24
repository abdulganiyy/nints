import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must contain at least 3 characters"),

  email: z
    .string()
    .email("Enter a valid email address"),

  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,15}$/,
      "Enter a valid phone number"
    ),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),

    agreed:z.boolean()
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit OTP"),
});

export const createPinSchema = z.object({
  pin: z.string().regex(/^\d{4}$/, "PIN must contain 4 digits"),

  confirmPin: z.string().regex(
    /^\d{4}$/,
    "Confirm your 4-digit PIN"
  ),
}).refine(
  (data) => data.pin === data.confirmPin,
  {
    message: "PINs do not match",
    path: ["confirmPin"],
  }
);


export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    otp: z.string().length(6, "Enter the 6-digit code"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordSchema
>;

export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordSchema
>;

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type CreatePinFormData = z.infer<typeof createPinSchema>;