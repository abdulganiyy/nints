import { FieldConfig } from "@/types";

export const registerFieldConfig: FieldConfig[] = [
  {
    name: "fullname",
    label: "Full Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
  },
  {
    name: "phone",
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

export const loginFieldConfig: FieldConfig[] = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "text",
  },
];

export const airtimeFieldsConfig: FieldConfig[] = [
  {
    name: "network",
    label: "Network",
    type: "select",
    options: [
      { label: "MTN", value: "MTN" },
      { label: "Airtel", value: "AIRTEL" },
      { label: "Glo", value: "GLO" },
      { label: "9mobile", value: "9MOBILE" },
    ],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
  },
];

export const dataFieldsCongig: FieldConfig[] = [
  {
    name: "network",
    label: "Network",
    type: "select",
    options: [],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "plan",
    label: "Data Plan",
    type: "select",
    options: [],
  },
];

export const electricityFieldsConfig: FieldConfig[] = [
  {
    name: "provider",
    label: "Electricity Provider",
    type: "select",
    options: [],
  },
  {
    name: "meterNumber",
    label: "Meter Number",
    type: "text",
  },
  {
    name: "amount",
    label: "Amount",
    type: "text",
  },
];
