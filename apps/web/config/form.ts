import { FieldConfig } from "@/types";

export const registerFieldConfig: FieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "text",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "text",
  },
  {
    name: "agreed",
    label: "I agree to the Terms of Service and Privacy Policy.",
    type: "checkbox",
    hideLabel: true,
  },
];
