"use client";

import { StatsCards } from "@/components/StatsCards";
import { LeadTable } from "@/components/LeadTable";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface DashboardProps {
  title: string;
}

export function Dashboard({ title }: DashboardProps) {
  return (
    <motion.div {...fadeIn} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>

      <Suspense fallback={<div>Loading statistics...</div>}>
        <StatsCards />
      </Suspense>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Lead Management</h2>
        <Suspense fallback={<div>Loading leads table...</div>}>
          <LeadTable />
        </Suspense>
      </div>
    </motion.div>
  );
}
