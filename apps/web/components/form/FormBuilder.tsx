"use client";

import { ReactNode, useEffect, useMemo } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
  useWatch,
  UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FieldRenderer from "./FieldRenderer";
import { FieldConfig } from "@/types";
import { Button } from "../ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props<T extends FieldValues> = {
  config: FieldConfig[];
  title?: string;
  description?: string;
  schema: z.ZodTypeAny;
  onSubmit: (values: T) => void | Promise<void>;
  submitText?: string;
  className?: string;
  footer?: ReactNode;
  values?: Partial<T>;
  isSubmitting?: boolean;

  onValuesChange?: (values: Partial<T>, setValue: UseFormSetValue<T>) => void;
};

export default function FormBuilder<T extends FieldValues>({
  config,
  schema,
  onSubmit,
  title,
  description,
  submitText,
  footer,
  values,
  isSubmitting = false,
  onValuesChange,
}: Props<T>) {
  const defaults = useMemo(() => {
    const result: Record<string, unknown> = {};

    for (const field of config) {
      result[field.name] = field.defaultValue;
    }

    return result as DefaultValues<T>;
  }, [config]);

  const methods = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      ...defaults,
      ...values,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (values) {
      methods.reset({
        ...defaults,
        ...values,
      });
    }
  }, [values, defaults, methods]);

  const formValues = useWatch({
    control: methods.control,
  });

  useEffect(() => {
    onValuesChange?.(formValues as Partial<T>, methods.setValue);
  }, [formValues, onValuesChange, methods.setValue]);

  return (
    <div className="w-full max-w-xl">
      <div className="text-center">
        {title && <h1 className="text-4xl font-bold">{title}</h1>}

        {description && <p className="mt-3 text-slate-500">{description}</p>}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mt-5 space-y-4"
        >
          {config.map((field) => (
            <div key={field.name} className="w-full">
              <FieldRenderer field={field} />
            </div>
          ))}

          <div className="flex py-5">
            <Button
              size="lg"
              type="submit"
              disabled={methods.formState.isSubmitting || isSubmitting}
              className="w-full px-5 py-3 text-white"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Signing In...
                </>
              ) : (
                (submitText ?? "Submit")
              )}
            </Button>
          </div>
        </form>
      </FormProvider>

      {footer}
    </div>
  );
}
