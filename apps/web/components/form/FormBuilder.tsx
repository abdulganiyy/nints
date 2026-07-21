import { FormProvider, useForm, DefaultValues } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ZodSchema } from "zod";

import FieldRenderer from "./FieldRenderer";

import { FormConfig } from "@/types";
import { cn } from "@/lib/utils";

type Props<T extends Record<string, unknown>> = {
  config: FormConfig[];

  schema: ZodSchema<T>;

  onSubmit: (values: T) => void | Promise<void>;
};

export default function FormBuilder<T extends Record<string, unknown>>({
  config,
  schema,
  onSubmit,
}: Props<T>) {
  const defaults = config
    .map((section) => section.fields)
    .reduce((acc, config) => {
      return acc.concat(config);
    }, [])
    .reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {} as DefaultValues<T>);

  const methods = useForm<T>({
    resolver: zodResolver(schema as any),

    defaultValues: defaults,

    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-5" onSubmit={methods.handleSubmit(onSubmit)}>
        {config.map((section) => (
          <div key={section.title} className="rounded-sm border bg-white">
            <div className="flex items-center gap-2 p-5 border-b">
              {section.icon && <section.icon color="#FE9F43" />} {section.title}
            </div>
            <div className="grid grid-cols-2 gap-5 p-5">
              {section.fields.map((field) => {
                return (
                  <div
                    key={field.name}
                    className={cn({
                      "col-span-2": field.fullWidth || field.type == "file",
                      "w-1/3": field.oneThirdWidth,
                    })}
                  >
                    <FieldRenderer key={field.name} field={field} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-end py-5">
          <button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
