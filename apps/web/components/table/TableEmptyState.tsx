import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

type TableEmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function TableEmptyState({
  title = "No data found",
  description = "There are no records to display.",
  actionLabel,
  onAction,
}: TableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FileSearch className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
