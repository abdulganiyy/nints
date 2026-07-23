import { ReactNode } from "react";
import { FormProvider, useForm, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import FieldRenderer from "./FieldRenderer";
import { FieldConfig } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props<T extends Record<string, unknown>> = {
  config: FieldConfig[];
  title: string;
  description?: string;
  schema: ZodSchema<T>;
  onSubmit: (values: T) => void | Promise<void>;
  submitText?: string;
  className?: string;
  footer?: ReactNode;
};

export default function FormBuilder<T extends Record<string, unknown>>({
  config,
  schema,
  onSubmit,
  title,
  description,
  submitText,
}: Props<T>) {
  const defaults = config.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {} as DefaultValues<T>);

  const methods = useForm<T>({
    resolver: zodResolver(schema as any),

    defaultValues: defaults,

    mode: "onChange",
  });

  return (
    <>
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{title}</h1>

          <p className="mt-3 text-slate-500">{description}</p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-5 space-y-4"
          >
            {config.map((field) => (
              <div key={field.name}>
                <div className="w-full">
                  <FieldRenderer key={field.name} field={field} />
                </div>
              </div>
            ))}

            <div className="flex justify-center py-5">
              <Button
                size="lg"
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="px-5 py-3 text-white"
              >
                {submitText ?? "Submit"}{" "}
                {methods.formState.isSubmitting && <Spinner />}
              </Button>
            </div>
          </form>
        </FormProvider>
        {/* <div className="mt-8 text-center">
          <p className="text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-600">
              Sign In
            </Link>
          </p>
        </div> */}
      </div>
    </>
  );
}
