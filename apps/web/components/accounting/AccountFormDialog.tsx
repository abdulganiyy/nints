"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller } from "react-hook-form";

import {
  Account,
  AccountType,
  CreateAccountPayload,
} from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const accountSchema = z.object({
  code: z.string().trim().min(1, "Account code is required").max(30),
  name: z.string().trim().min(2, "Account name must be at least 2 characters").max(100),
  description: z.string().max(500).optional(),
  type: z.enum([
    "ASSET",
    "LIABILITY",
    "EQUITY",
    "REVENUE",
    "EXPENSE",
  ]),
  parentId: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

type Props = {
  open: boolean;
  account?: Account | null;
  accounts: Account[];
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CreateAccountPayload) => Promise<void>;
};

const accountTypes: {
  value: AccountType;
  label: string;
}[] = [
  { value: "ASSET", label: "Asset" },
  { value: "LIABILITY", label: "Liability" },
  { value: "EQUITY", label: "Equity" },
  { value: "REVENUE", label: "Revenue" },
  { value: "EXPENSE", label: "Expense" },
];

export default function AccountFormDialog({
  open,
  account,
  accounts,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: Props) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      type: "ASSET",
      parentId: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    setSubmitError(null);

    methods.reset({
      code: account?.code ?? "",
      name: account?.name ?? "",
      description: account?.description ?? "",
      type: account?.type ?? "ASSET",
      parentId: account?.parentId ?? "",
    });
  }, [open, account, methods.reset]);

  const handleSubmit = async (values: AccountFormValues) => {
    setSubmitError(null);

    try {
      await onSubmit({
        code: values.code.trim(),
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        type: values.type,
        parentId: values.parentId || undefined,
      });

      onOpenChange(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to save the account.",
      );
    }
  };

  const availableParents = accounts.filter(
    (item) =>
      item.id !== account?.id &&
      item.status === "ACTIVE",
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isSubmitting) onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {account ? "Edit Account" : "Create Account"}
          </DialogTitle>

          <DialogDescription>
            Configure an account in your chart of accounts.
          </DialogDescription>
        </DialogHeader>

          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Controller
              control={methods.control}
              name="code"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Account Code</FieldLabel>

                    <Input
                      placeholder="e.g. 1000"
                      {...field}
                      disabled={isSubmitting || Boolean(account?.isSystem)}
                    />

                  <FieldError />
                </Field>
              )}
            />

            <Controller
              control={methods.control}
              name="name"
              render={({ field }) => (
                <div>
                  <FieldLabel>Account Name</FieldLabel>

                  <>
                    <Input
                      placeholder="e.g. Bank / Cash"
                      {...field}
                      disabled={isSubmitting || Boolean(account?.isSystem)}
                    />
                  </>

                  <FieldError />
                </div>
              )}
            />

            <Controller
              control={methods.control}
              name="type"
              render={({ field }) => (
                <div>
                  <FieldLabel>Account Type</FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting || Boolean(account?.isSystem)}
                  >
                    <Field>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </Field>

                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError />
                </div>
              )}
            />

            <Controller
              control={methods.control}
              name="parentId"
              render={({ field }) => (
                <div>
                  <FieldLabel>Parent Account (Optional)</FieldLabel>

                  <Select
                    value={field.value || "none"}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? "" : value)
                    }
                    disabled={isSubmitting || Boolean(account?.isSystem)}
                  >
                    <Field>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent account" />
                      </SelectTrigger>
                    </Field>

                    <SelectContent>
                      <SelectItem value="none">
                        No parent account
                      </SelectItem>

                      {availableParents
                        .filter((item) => item.type === methods.watch("type"))
                        .map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.code} — {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <FieldError />
                </div>
              )}
            />

            <Controller
              control={methods.control}
              name="description"
              render={({ field }) => (
                <div>
                  <FieldLabel>Description (Optional)</FieldLabel>

                  <Field>
                    <Textarea
                      placeholder="Describe the purpose of this account."
                      {...field}
                      value={field.value ?? ""}
                      disabled={isSubmitting || Boolean(account?.isSystem)}
                    />
                  </Field>

                  <FieldError />
                </div>
              )}
            />

            {account?.isSystem && (
              <p className="text-sm text-muted-foreground">
                This is a system account. Its code, name, and type cannot be changed here.
              </p>
            )}

            {submitError && (
              <p role="alert" className="text-sm text-destructive">
                {submitError}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : account
                    ? "Save Changes"
                    : "Create Account"}
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  );
}