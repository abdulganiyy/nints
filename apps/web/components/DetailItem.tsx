import { StatusBadge } from "@/components/StatusBadge";
import { StatusType } from "@/config/status";

type DetailItemProps = {
  label: string;
  value?: string | number | null;
  statusType?: StatusType;
};

export function DetailItem({ label, value, statusType }: DetailItemProps) {
  const isEmpty = value === null || value === undefined || value === "";

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <div className="text-sm">
        {isEmpty ? (
          <span className="text-muted-foreground">—</span>
        ) : statusType ? (
          <StatusBadge type={statusType} status={String(value)} />
        ) : (
          value
        )}
      </div>
    </div>
  );
}
