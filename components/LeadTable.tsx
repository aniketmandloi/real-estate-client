"use client";

import { useLeadPolling } from "@/hooks/useLeadPolling";
import { TableSkeleton } from "./TableSkeleton";

export function LeadTable() {
  const { data: leads, isLoading, error } = useLeadPolling();

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error loading leads</div>;
  if (!leads?.length) return <div>No leads found</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
