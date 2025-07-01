import { NextResponse } from "next/server";
import { webhookSchema } from "@/lib/validations";
import { updateLeadStatus, logLeadError } from "@/lib/database";
import { ValidationError } from "@/lib/errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/webhook - Handle n8n workflow status updates
export async function POST(request: Request) {
  try {
    console.log("Webhook received:", {
      headers: Object.fromEntries(request.headers.entries()),
      url: request.url,
    });

    // Verify webhook secret
    const authHeader = request.headers.get("authorization");
    console.log("Auth header:", authHeader);
    console.log("Expected:", `Bearer ${process.env.WEBHOOK_SECRET}`);
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

    // Don't change status for email/sms, only update timestamp
    if (status === "emailed" || status === "texted") {
      await prisma.lead.update({
        where: { id: leadId },
        data: {
          [timestampField]: new Date(timestamp),
        },
      });
    } else {
      // For other statuses (completed, error), update both status and timestamp
      await updateLeadStatus(leadId, status, {
        [timestampField]: new Date(timestamp),
      });
    }

    return NextResponse.json({ status: "updated" });
  } catch (error) {
    console.error("Detailed webhook error:", error);
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
