"use client";
import { Control, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldConfig } from "@/types";

type MultiSelectFieldProps = {
  field: FieldConfig;
  control: Control<any>;
};

export const MultiSelectField = ({ field, control }: MultiSelectFieldProps) => {
  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: controllerField }) => {
        const values: string[] = controllerField.value ?? [];
        const selectedOptions =
          field.options?.filter((option) => values.includes(option.value)) ??
          [];
        return (
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-10 w-full justify-between"
                  disabled={field.disabled}
                >
                  <div className="flex flex-wrap gap-1">
                    {selectedOptions.length === 0 ? (
                      <span className="text-muted-foreground">
                        {field.placeholder ?? "Select options..."}
                      </span>
                    ) : (
                      selectedOptions.map((option) => (
                        <span
                          key={option.value}
                          className="bg-secondary rounded px-2 py-1 text-xs"
                        >
                          {option.label}
                        </span>
                      ))
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              }
            ></PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty> No results found. </CommandEmpty>
                  <CommandGroup>
                    {field.options?.map((option) => {
                      const selected = values.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => {
                            const nextValue = selected
                              ? values.filter((value) => value !== option.value)
                              : [...values, option.value];
                            controllerField.onChange(nextValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};
