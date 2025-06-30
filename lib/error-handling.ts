export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class WebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookError";
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ValidationError) {
    return { error: error.message, status: 400 };
  }
  if (error instanceof DatabaseError) {
    return { error: "Database operation failed", status: 500 };
  }
  if (error instanceof WebhookError) {
    return { error: "Webhook processing failed", status: 502 };
  }
  return { error: "An unexpected error occurred", status: 500 };
}

export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
