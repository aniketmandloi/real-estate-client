"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLeadSubmission } from "@/hooks/useLeadSubmission";

export function LeadForm() {
  const {
    isSubmitting,
    submitSuccess,
    submitError,
    submitLead,
    resetSubmissionState,
  } = useLeadSubmission();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      property_address: "",
      preferred_viewing_date: "",
    },
  });

  async function onSubmit(data: LeadFormData) {
    try {
      await submitLead(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting lead:", error);
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Schedule a Property Viewing</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll contact you to arrange a
          viewing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          onChange={resetSubmissionState}
        >
          <FormField
            id="name"
            label="Name"
            register={form.register}
            error={form.formState.errors.name}
            placeholder="John Doe"
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            register={form.register}
            error={form.formState.errors.email}
            placeholder="john@example.com"
          />

          <FormField
            id="phone"
            label="Phone Number"
            type="tel"
            register={form.register}
            error={form.formState.errors.phone}
            placeholder="+1 (555) 000-0000"
          />

          <FormField
            id="property_address"
            label="Property Address"
            register={form.register}
            error={form.formState.errors.property_address}
            placeholder="123 Main St, City, State"
          />

          <FormField
            id="preferred_viewing_date"
            label="Preferred Viewing Date"
            type="datetime-local"
            register={form.register}
            required={false}
            error={form.formState.errors.preferred_viewing_date}
          />

          {submitError && (
            <div
              role="alert"
              className="p-3 text-sm text-red-500 bg-red-50 rounded-md"
            >
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div
              role="alert"
              className="p-3 text-sm text-green-500 bg-green-50 rounded-md"
            >
              Thank you! We&apos;ll contact you shortly to confirm your viewing.
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Schedule Viewing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
