import { useState } from "react";
import { LeadFormData } from "@/lib/validations";
import { API_ENDPOINTS } from "@/lib/constants";

interface UseLeadSubmissionReturn {
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  submitLead: (data: LeadFormData) => Promise<void>;
  resetSubmissionState: () => void;
}

export function useLeadSubmission(): UseLeadSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetSubmissionState = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const submitLead = async (data: LeadFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch(API_ENDPOINTS.LEADS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit lead");
      }

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitSuccess,
    submitError,
    submitLead,
    resetSubmissionState,
  };
}
