"use client";

import { MoreHorizontal, Pencil, Power } from "lucide-react";

import { Account } from "@/types";

import { Button } from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  accounts: Account[];
  isLoading: boolean;
  onEdit: (account: Account) => void;
  onDeactivate: (account: Account) => void;
};

const typeLabels: Record<Account["type"], string> = {
  ASSET: "Asset",
  LIABILITY: "Liability",
  EQUITY: "Equity",
  REVENUE: "Revenue",
  EXPENSE: "Expense",
};

export default function AccountsTable({
  accounts,
  isLoading,
  onEdit,
  onDeactivate,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-12 animate-pulse rounded bg-muted"
          />
        ))}
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium">No accounts found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your filters or create an account.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            {/* <TableHead>Normal Balance</TableHead> */}
            {/* <TableHead>Status</TableHead> */}
            <TableHead>Account Class</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-mono font-medium">
                {account.code}
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">{account.name}</p>

                  {account.description && (
                    <p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">
                      {account.description}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>
                {typeLabels[account.type]}
              </TableCell>

         
              {/* <TableCell>
                <Badge
                  variant={
                    account.status === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                >
                  {account.status}
                </Badge>
              </TableCell> */}

              <TableCell>
                {account.isSystem ? "System" : "Custom"}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={   <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Actions for ${account.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>}>
                 
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onEdit(account)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit account
                    </DropdownMenuItem>

                    {account.status === "ACTIVE" && (
                      <DropdownMenuItem
                        disabled={account.isSystem}
                        onClick={() => onDeactivate(account)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Power className="mr-2 h-4 w-4" />
                        Deactivate account
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}