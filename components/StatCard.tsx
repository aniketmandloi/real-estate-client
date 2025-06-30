import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { LeadStatus } from "@/types";

interface StatCardProps {
  title: string;
  value: number;
  status?: LeadStatus;
  className?: string;
}

export function StatCard({ title, value, status, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-2">
          {status ? (
            <StatusBadge status={status} className="text-lg" />
          ) : (
            <CardTitle className="text-lg font-semibold text-gray-700">
              {title}
            </CardTitle>
          )}
        </div>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
