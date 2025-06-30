"use client";

import { StatsCards } from "@/components/StatsCards";
import { LeadTable } from "@/components/LeadTable";
import { Suspense } from "react";

interface DashboardProps {
  title: string;
}

export function Dashboard({ title }: DashboardProps) {
  return (
    <div className="space-y-8">
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
    </div>
  );
}
