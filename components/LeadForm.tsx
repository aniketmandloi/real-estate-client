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
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ErrorMessage } from "@/components/ErrorMessage";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export function LeadForm() {
  const { isSubmitting, submitSuccess, submitError, submitLead } =
    useLeadSubmission();

  const { error, handleError } = useErrorHandler();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      property_address: "",
      preferred_viewing_date: null,
    },
  });

  async function onSubmit(data: LeadFormData) {
    try {
      const formData = {
        ...data,
        preferred_viewing_date: data.preferred_viewing_date
          ? new Date(data.preferred_viewing_date).toISOString()
          : null,
      };
      await submitLead(formData);
      form.reset();
    } catch (err) {
      handleError(err);
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
        <motion.form
          {...fadeIn}
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
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

          {error && <ErrorMessage message={error} className="mb-4" />}

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

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoadingSkeleton
                  width="20px"
                  height="20px"
                  className="rounded-full mr-2"
                />
                Submitting...
              </div>
            ) : (
              "Schedule Viewing"
            )}
          </Button>
        </motion.form>
      </CardContent>
    </Card>
  );
}
