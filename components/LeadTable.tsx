"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { TableFilters } from "@/components/TableFilters";
import { useLeadPolling } from "@/hooks/useLeadPolling";
import { LeadStatus } from "@/types";

const LEADS_PER_PAGE = 10;

export function LeadTable() {
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const { leads, isLoading, error } = useLeadPolling({
    status: statusFilter === "all" ? undefined : statusFilter,
    limit: LEADS_PER_PAGE,
  });

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (isLoading) {
    return <div className="text-center">Loading leads...</div>;
  }

  return (
    <div className="space-y-4">
      <TableFilters
        currentStatus={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Property Address</TableHead>
              <TableHead>Viewing Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell
                  className="max-w-xs truncate"
                  title={lead.property_address}
                >
                  {lead.property_address}
                </TableCell>
                <TableCell>
                  {lead.preferred_viewing_date
                    ? format(new Date(lead.preferred_viewing_date), "PPp")
                    : "Not specified"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>
                <TableCell>{format(new Date(lead.created_at), "PP")}</TableCell>
              </TableRow>
            ))}
            {leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No leads found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
