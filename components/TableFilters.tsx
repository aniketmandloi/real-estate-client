import { Button } from "@/components/ui/button";
import { LeadStatus } from "@/types";
import { LEAD_STATUS_CONFIG } from "@/lib/constants";

interface TableFiltersProps {
  currentStatus: LeadStatus | "all";
  onStatusChange: (status: LeadStatus | "all") => void;
}

export function TableFilters({
  currentStatus,
  onStatusChange,
}: TableFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={currentStatus === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange("all")}
      >
        All Leads
      </Button>
      {Object.entries(LEAD_STATUS_CONFIG).map(([status, config]) => (
        <Button
          key={status}
          variant={currentStatus === status ? "default" : "outline"}
          size="sm"
          className={currentStatus === status ? "" : config.color}
          onClick={() => onStatusChange(status as LeadStatus)}
        >
          {config.label}
        </Button>
      ))}
    </div>
  );
}
