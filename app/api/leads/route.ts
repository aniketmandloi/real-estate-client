import { NextResponse } from "next/server";
import { leadFormSchema, leadFilterSchema } from "@/lib/validations";
import { createLead, getLeads, getLeadById } from "@/lib/database";
// import { LeadStatus } from "@/types";

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
    const { searchParams, pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    // Handle single lead retrieval
    if (id && id !== "leads") {
      const lead = await getLeadById(id);
      if (!lead) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }
      return NextResponse.json(lead);
    }

    // Handle lead listing with filters
    const validatedParams = leadFilterSchema.parse({
      status: searchParams.get("status"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    });

    const leads = await getLeads(validatedParams);
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
