// import { WebhookPayload } from "@/lib/validations";
import { ValidationError } from "@/lib/errors";

export function validateWebhookSecret(authHeader: string | null): void {
  if (!process.env.WEBHOOK_SECRET) {
    throw new ValidationError("Webhook secret not configured");
  }

  if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    throw new ValidationError("Invalid webhook secret");
  }
}

export function formatWebhookResponse(
  status: string,
  data?: Record<string, unknown>
) {
  return {
    success: true,
    status,
    ...(data && { data }),
  };
}
