import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/types";
import { LEAD_STATUS_CONFIG } from "@/lib/constants";

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = LEAD_STATUS_CONFIG[status];

  return (
    <Badge variant="outline" className={`${config.color} ${className || ""}`}>
      {config.label}
    </Badge>
  );
}
