"use client";

import { useLeadPolling } from "@/hooks/useLeadPolling";
import { TableSkeleton } from "./TableSkeleton";

export function LeadTable() {
  const { leads, isLoading, error } = useLeadPolling();

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (!leads?.length) {
    return <div className="text-center py-8 text-gray-500">No leads found</div>;
  }

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
