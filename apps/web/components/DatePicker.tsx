"use client";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  captionLayout?: boolean;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  id,
  disabled,
  captionLayout,
}: DatePickerProps) {
  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <Popover>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              disabled={disabled}
              className="w-full justify-start font-normal"
            >
              {value ? format(value, "PPP") : placeholder}
            </Button>
          }
        />

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            defaultMonth={value}
            captionLayout={captionLayout ? "dropdown" : undefined}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
