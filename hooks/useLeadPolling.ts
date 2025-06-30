import { useState, useEffect } from "react";
import { Lead } from "@/types";
// import { API_ENDPOINTS } from "@/lib/constants";

export function useLeadPolling() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setError(null);
        const response = await fetch("/api/leads");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setLeads(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch leads");
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchLeads();

    // Set up polling
    const interval = setInterval(fetchLeads, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return { leads, isLoading, error };
}
