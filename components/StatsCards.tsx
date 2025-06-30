"use client";

import { StatCard } from "./StatCard";
import { LeadStatus } from "@/types";
import { useLeadStats } from "@/hooks/useLeadStats";

export function StatsCards() {
  const { stats, error, isLoading } = useLeadStats();

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (isLoading || !stats) {
    return <div className="text-center">Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total Leads"
        value={stats.total}
        className="xl:col-span-2"
      />
      {Object.entries(stats.by_status).map(([status, count]) => (
        <StatCard
          key={status}
          title={status}
          value={count}
          status={status as LeadStatus}
        />
      ))}
    </div>
  );
}
