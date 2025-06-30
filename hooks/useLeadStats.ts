import { useQuery } from "@tanstack/react-query";
import { LeadStats } from "@/types";

export function useLeadStats() {
  return useQuery<LeadStats>({
    queryKey: ["leadStats"],
    queryFn: async () => {
      const response = await fetch("/api/leads/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      return response.json();
    },
  });
}
