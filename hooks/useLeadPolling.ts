import { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types";
import { API_ENDPOINTS } from "@/lib/constants";

interface UseLeadPollingOptions {
  status?: LeadStatus;
  page?: number;
  limit?: number;
}

interface UseLeadPollingReturn {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
}

export function useLeadPolling(
  options: UseLeadPollingOptions = {}
): UseLeadPollingReturn {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(options.page || 1);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const params = new URLSearchParams({
          ...(options.status && { status: options.status }),
          page: page.toString(),
          limit: (options.limit || 10).toString(),
        });

        const response = await fetch(`${API_ENDPOINTS.LEADS}?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await response.json();
        setLeads(data);
        setError(null);
      } catch (err) {
        setError("Error loading leads");
        console.error("Error fetching leads:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchLeads();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchLeads, 5000);

    return () => clearInterval(interval);
  }, [options.status, page, options.limit]);

  return { leads, isLoading, error, page, setPage };
}
