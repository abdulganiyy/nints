import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";
import { FieldConfig } from "@/types";
import { SearchableSelect } from "./SearchableSelect";

type ArrayFieldProps = {
  field: FieldConfig;
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export const ArrayField = ({
  field,
  control,
  register,
  errors,
}: ArrayFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  });

  const createEmptyItem = () => {
    const item: Record<string, any> = {};

    field.fields?.forEach((child) => {
      item[child.name] = child.type === "number" ? 1 : "";
    });

    return item;
  };

  return (
    <div className="space-y-4">
      {fields.map((item, index) => (
        <div key={item.id} className="rounded-lg border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Item {index + 1}</p>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {field.fields?.map((childField) => {
              const fieldName = `${field.name}.${index}.${childField.name}`;

              // const childError =
              //   errors?.[field.name]?.[index]?.[childField.name];

              return (
                <div key={childField.name} className="space-y-2">
                  <label className="text-sm font-medium">
                    {childField.label}
                  </label>

                  {childField.type === "select" && (
                    <Controller
                      control={control}
                      name={fieldName}
                      render={({ field: controllerField }) => (
                        <Select
                          items={childField.options}
                          value={controllerField.value ?? ""}
                          onValueChange={controllerField.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={childField.placeholder} />
                          </SelectTrigger>

                          <SelectContent>
                            {childField.options?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}

                  {childField.type === "number" && (
                    <Input
                      type="number"
                      min={childField.min}
                      placeholder={childField.placeholder}
                      {...register(fieldName, {
                        valueAsNumber: true,
                      })}
                    />
                  )}

                  {childField.type === "text" && (
                    <Input
                      placeholder={childField.placeholder}
                      {...register(fieldName)}
                    />
                  )}

                  {childField.type === "searchable-select" && (
                    <SearchableSelect
                      field={childField}
                      control={control}
                      name={fieldName}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append(createEmptyItem())}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  );
};
