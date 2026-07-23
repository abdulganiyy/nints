import { useFormContext } from "react-hook-form";
import { FieldConfig } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageDropZone from "./ImageDropZone";

type Props = {
  field: FieldConfig;
};

export default function FieldRenderer({ field }: Props) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const error = errors[field.name]?.message?.toString();

  const inputStyle = "w-full rounded-lg border p-3 outline-none";

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhField, fieldState: rhFieldState }) => (
        <div className="space-y-2">
          {field.hideLabel ? null : (
            <FieldLabel className="block font-medium">{field.label}</FieldLabel>
          )}

          {field.type === "textarea" && (
            <Textarea {...rhField} placeholder={field.placeholder} />
          )}

          {field.type === "select" && (
            <Select
              name={rhField.name}
              value={rhField.value}
              onValueChange={rhField.onChange}
            >
              <SelectTrigger
                id={rhField.name}
                aria-invalid={rhFieldState.invalid}
              >
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {field.type === "checkbox" && field.options && (
            <FieldGroup className="flex max-w-72">
              {field.options.map((option) => (
                <Field key={option.label} orientation="horizontal">
                  <Checkbox
                    id={option.label}
                    name={rhField.name}
                    aria-invalid={rhFieldState.invalid}
                    checked={rhField.value.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...rhField.value, option.value]
                        : rhField.value.filter(
                            (value: string) => value !== option.value,
                          );
                      rhField.onChange(newValue);
                    }}
                  />
                  <Label htmlFor={option.label}>{option.label}</Label>
                </Field>
              ))}
            </FieldGroup>
          )}

          {field.type === "checkbox" && !field.options && (
            <Field key={field.name} orientation="horizontal">
              <Checkbox
                id={field.name}
                name={rhField.name}
                aria-invalid={rhFieldState.invalid}
                checked={rhField.value}
                onCheckedChange={rhField.onChange}
              />
              <Label htmlFor={field.name}>{field.label}</Label>
            </Field>
          )}

          {field.type === "radio" && field.options && (
            <FieldSet data-invalid={rhFieldState.invalid}>
              <RadioGroup
                name={rhField.name}
                value={rhField.value}
                onValueChange={rhField.onChange}
                aria-invalid={rhFieldState.invalid}
              >
                {field.options?.map((option) => (
                  <FieldLabel key={option.label} htmlFor={option.label}>
                    <Field
                      orientation="horizontal"
                      data-invalid={rhFieldState.invalid}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.label}
                        aria-invalid={rhFieldState.invalid}
                      />
                      <FieldTitle>{option.label}</FieldTitle>
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldSet>
          )}

          {field.type == "file" && (
            <ImageDropZone
              {...rhField}
              type={field.type}
              placeholder={field.placeholder}
            />
          )}

          {!["textarea", "select", "checkbox", "radio", "file"].includes(
            field.type,
          ) && (
            <Input
              {...rhField}
              type={field.type}
              placeholder={field.placeholder}
            />
          )}

          {rhFieldState.invalid && <FieldError errors={[rhFieldState.error]} />}
        </div>
      )}
    />
  );
}
