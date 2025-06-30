import * as z from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,}$/, "Please enter a valid phone number"),
  property_address: z.string().min(10, "Please provide a complete address"),
  preferred_viewing_date: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
