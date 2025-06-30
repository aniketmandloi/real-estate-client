import { useState, useEffect } from "react";
import { LeadStats } from "@/types";
import { API_ENDPOINTS } from "@/lib/constants";

interface UseLeadStatsReturn {
  stats: LeadStats | null;
  error: string | null;
  isLoading: boolean;
}

export function useLeadStats(): UseLeadStatsReturn {
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STATS);
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        setError("Error loading statistics");
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return { stats, error, isLoading };
}
