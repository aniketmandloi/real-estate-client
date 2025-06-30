"use client";

import { StatCard } from "./StatCard";
import { LeadStatus } from "@/types";
import { useLeadStats } from "@/hooks/useLeadStats";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function StatsCards() {
  const { data: stats, isLoading } = useLeadStats();

  if (isLoading || !stats) return <LoadingSkeleton />;

  return (
    <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </motion.div>
  );
}
