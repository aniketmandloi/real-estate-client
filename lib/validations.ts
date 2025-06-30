import { z } from "zod";

// Regular expressions for validation
// const PHONE_REGEX = /^\+?[\d\s-()]{10,}$/;
// const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Lead form validation schema
export const leadFormSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(20),
  property_address: z.string().min(10).max(1000),
  preferred_viewing_date: z.string().nullable().optional(),
});

// API request validation schemas
export const leadUpdateSchema = z.object({
  status: z.enum(["received", "emailed", "texted", "completed", "error"]),
  email_sent_at: z.string().datetime().optional(),
  sms_sent_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
  error_log: z.record(z.any()).optional(),
});

// Webhook payload validation schema
export const webhookSchema = z.object({
  leadId: z.string().uuid("Invalid lead ID"),
  status: z.enum(["emailed", "texted", "completed", "error"]),
  timestamp: z.string().datetime(),
  error: z.record(z.any()).optional(),
});

// Query parameter validation schemas
export const leadFilterSchema = z.object({
  status: z
    .enum(["received", "emailed", "texted", "completed", "error"])
    .optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

// Type exports for TypeScript usage
export type LeadFormData = z.infer<typeof leadFormSchema>;
export type LeadUpdate = z.infer<typeof leadUpdateSchema>;
export type WebhookPayload = z.infer<typeof webhookSchema>;
export type LeadFilter = z.infer<typeof leadFilterSchema>;
