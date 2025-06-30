"use client";

import { StatCard } from "./StatCard";
import { LeadStatus } from "@/types";
import { useLeadStats } from "@/hooks/useLeadStats";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface StatsCardsProps {
  isLoading?: boolean;
}

export function StatsCards({ isLoading = false }: StatsCardsProps) {
  const { stats, error } = useLeadStats();

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow-sm">
            <LoadingSkeleton width="100px" height="24px" className="mb-2" />
            <LoadingSkeleton width="60px" height="32px" />
          </div>
        ))}
      </div>
    );
  }

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
