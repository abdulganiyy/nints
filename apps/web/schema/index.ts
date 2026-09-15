import { phoneRegex } from "@/utils/constants";
import z from "zod";

export const airtimeSchema = z.object({
  network: z.enum(["MTN", "AIRTEL", "GLO", "9MOBILE"], {
    message: "Please select a network",
  }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(phoneRegex, { message: "Invalid phone number format." }),
  amount: z.coerce
    .number()
    .min(50, "Minimum airtime amount is ₦50")
    .max(100000, "Maximum airtime amount is ₦100,000"),
});

export const dataSchema = z.object({
  network: z.string({
    message: "Please select a network",
  }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(phoneRegex, { message: "Invalid phone number format." }),
  planCode: z.coerce.string().min(1, { message: "Plan Code is required." }),
  amount: z.coerce
    .number()
    .min(50, "Minimum data amount is ₦50")
    .max(100000, "Maximum data amount is ₦100,000"),
});

export const cableSchema = z.object({
  provider: z.string({
    message: "Please select a provider",
  }),
  iucNumber: z.string().min(1, { message: "IUC number is required." }),
  planCode: z.coerce.string().min(1, { message: "Plan Code is required." }),
  amount: z.coerce
    .number()
    .min(50, "Minimum amount is ₦50")
    .max(100000, "Maximum amount is ₦100,000"),
});

export const electricitySchema = z.object({
  provider: z.string({
    message: "Please select a provider",
  }),
  meterNumber: z.string().min(1, { message: "IUC number is required." }),
  planCode: z.coerce.string().min(1, { message: "Plan Code is required." }),
  amount: z.coerce
    .number()
    .min(50, "Minimum amount is ₦50")
    .max(100000, "Maximum amount is ₦100,000"),
});
