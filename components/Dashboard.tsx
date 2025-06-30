"use client";

import { StatsCards } from "@/components/StatsCards";
import { LeadTable } from "@/components/LeadTable";
import { Suspense, useState, useEffect } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { TableSkeleton } from "./TableSkeleton";

interface DashboardProps {
  title: string;
}

export function Dashboard({ title }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <LoadingSkeleton width="200px" height="32px" />
        <StatsCards isLoading={true} />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <motion.div {...fadeIn} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>

      <Suspense
        fallback={<div className="text-center">Loading statistics...</div>}
      >
        <StatsCards />
      </Suspense>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Lead Management</h2>
        <Suspense
          fallback={<div className="text-center">Loading leads table...</div>}
        >
          <LeadTable />
        </Suspense>
      </div>
    </motion.div>
  );
}
