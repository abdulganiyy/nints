import { Badge } from "@/components/ui/badge";
import { getStatusConfig, StatusType } from "@/config/status";

type StatusBadgeProps = {
  type: StatusType;
  status: string;
};

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const config = getStatusConfig(type, status);

  return <Badge className={config.className}>{config.label}</Badge>;
}
