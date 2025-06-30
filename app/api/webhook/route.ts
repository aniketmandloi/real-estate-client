import { NextResponse } from "next/server";
import { webhookSchema } from "@/lib/validations";
import { updateLeadStatus, logLeadError } from "@/lib/database";
import { ValidationError } from "@/lib/errors";

// POST /api/webhook - Handle n8n workflow status updates
export async function POST(request: Request) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate webhook payload
    const body = await request.json();
    const { leadId, status, timestamp, error } = webhookSchema.parse(body);

    if (error) {
      // Log error and update lead status
      await logLeadError(leadId, error);
      return NextResponse.json({ status: "error_logged" });
    }

    // Update lead status with appropriate timestamp
    const timestampField = `${status}_at` as const;
    await updateLeadStatus(leadId, status, {
      [timestampField]: new Date(timestamp),
    });

    return NextResponse.json({ status: "updated" });
  } catch (error) {
    console.error("Webhook processing error:", error);

    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
