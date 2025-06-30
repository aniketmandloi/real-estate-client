import { useState, useCallback } from "react";
import { formatErrorMessage } from "@/lib/error-handling";

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown) => {
    const message = formatErrorMessage(err);
    setError(message);
    // Automatically clear error after 5 seconds
    setTimeout(() => setError(null), 5000);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
