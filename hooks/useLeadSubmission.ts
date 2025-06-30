import { useMutation } from "@tanstack/react-query";
import { LeadInput } from "@/types";

export function useLeadSubmission() {
  const mutation = useMutation({
    mutationFn: async (data: LeadInput) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit lead");
      return response.json();
    },
  });

  return {
    isSubmitting: mutation.isPending,
    submitSuccess: mutation.isSuccess,
    submitError: mutation.error?.message,
    submitLead: mutation.mutate,
  };
}
