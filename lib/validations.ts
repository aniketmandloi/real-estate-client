import * as z from "zod";

// Regular expressions for validation
const PHONE_REGEX = /^\+?[\d\s-()]{10,}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Lead form validation schema
export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Name can only contain letters, spaces, hyphens and apostrophes"
    ),

  email: z
    .string()
    .email("Invalid email address")
    .regex(EMAIL_REGEX, "Invalid email format")
    .max(255, "Email must be less than 255 characters"),

  phone: z
    .string()
    .regex(PHONE_REGEX, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),

  property_address: z
    .string()
    .min(10, "Please provide a complete address")
    .max(1000, "Address is too long"),

  preferred_viewing_date: z
    .string()
    .datetime()
    .optional()
    .transform((val) => (val ? new Date(val) : null)), // Transform to Date or null
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
