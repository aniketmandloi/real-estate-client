"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      property_address: "",
      preferred_viewing_date: "",
    },
  });

  async function onSubmit(data: LeadFormValues) {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // TODO: Replace with your API endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              className={cn(form.formState.errors.name && "border-red-500")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className={cn(form.formState.errors.email && "border-red-500")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register("phone")}
              className={cn(form.formState.errors.phone && "border-red-500")}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="property_address">Property Address</Label>
            <Input
              id="property_address"
              {...form.register("property_address")}
              className={cn(
                form.formState.errors.property_address && "border-red-500"
              )}
            />
            {form.formState.errors.property_address && (
              <p className="text-sm text-red-500">
                {form.formState.errors.property_address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_viewing_date">
              Preferred Viewing Date (Optional)
            </Label>
            <Input
              id="preferred_viewing_date"
              type="datetime-local"
              {...form.register("preferred_viewing_date")}
            />
          </div>

          {submitError && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md">
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
