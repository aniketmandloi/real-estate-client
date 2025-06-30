import { useQuery } from "@tanstack/react-query";
import { Lead } from "@/types";
// import { API_ENDPOINTS } from "@/lib/constants";

export function useLeadPolling() {
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }
      return response.json();
    },
  });
}
