import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations";
import { createLead, getLeads } from "@/lib/database";
import { LeadStatus } from "@/types";

// POST /api/leads - Create a new lead
export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = leadFormSchema.parse(body);

    // Create lead in database
    const lead = await createLead(validatedData);

    // Trigger n8n webhook for automation
    try {
      await fetch(process.env.N8N_WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WEBHOOK_SECRET}`,
        },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      // Log webhook error but don't fail the request
      console.error("Failed to trigger n8n webhook:", error);
    }

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 400 }
    );
  }
}

// GET /api/leads - Get leads with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as LeadStatus | null;

    const leads = await getLeads({ status });

    // Add console.log for debugging
    console.log("Fetched leads:", leads);

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
