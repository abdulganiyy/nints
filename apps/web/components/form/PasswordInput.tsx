import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FieldConfig } from "@/types";

type PasswordInputProps = {
  field: FieldConfig;
  rhField: any;
};

export const PasswordInput = ({ field, rhField }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <InputGroup>
        <InputGroupInput
          {...rhField}
          value={rhField.value ?? ""}
          type={!showPassword ? field.type : "text"}
          placeholder={field.placeholder}
        />

        <InputGroupAddon align="inline-end">
          {!showPassword ? (
            <EyeIcon onClick={() => setShowPassword(true)} />
          ) : (
            <EyeOffIcon onClick={() => setShowPassword(false)} />
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
