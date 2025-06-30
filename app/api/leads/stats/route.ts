import { NextResponse } from "next/server";
import { getLeadStats } from "@/lib/database";

// GET /api/leads/stats - Get lead statistics
export async function GET() {
  try {
    const stats = await getLeadStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead statistics" },
      { status: 500 }
    );
  }
}
