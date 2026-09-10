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
