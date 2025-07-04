import { prisma } from "./prisma";
import { Prisma, Lead as PrismaLead, LeadStatus } from "@prisma/client";
import { LeadStatus as CustomLeadStatus } from "@/types";

// Use Prisma's generated types instead of custom types
type Lead = PrismaLead;
type LeadInput = Omit<
  Lead,
  | "id"
  | "status"
  | "created_at"
  | "email_sent_at"
  | "sms_sent_at"
  | "completed_at"
  | "error_log"
  | "preferred_viewing_date"
> & {
  preferred_viewing_date?: string | null;
};
type LeadStats = { total: number; by_status: Record<LeadStatus, number> };

export async function createLead(data: LeadInput): Promise<Lead> {
  const { preferred_viewing_date, ...rest } = data;

  return prisma.lead.create({
    data: {
      ...rest,
      preferred_viewing_date: preferred_viewing_date
        ? new Date(preferred_viewing_date)
        : null,
      status: "received",
    },
  });
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  additionalData: Partial<Prisma.LeadUpdateInput> = {}
): Promise<void> {
  await prisma.lead.update({
    where: { id },
    data: {
      status,
      ...additionalData,
      ...(status === "completed" ? { completed_at: new Date() } : {}),
    },
  });
}

interface GetLeadsOptions {
  status?: CustomLeadStatus | null;
  page?: number;
  limit?: number;
}

export async function getLeads(options: GetLeadsOptions = {}) {
  try {
    const { status, page = 1, limit = 10 } = options;
    const leads = await prisma.lead.findMany({
      where: status ? { status } : {},
      orderBy: { created_at: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    // Add console.log for debugging
    console.log("Database query result:", leads);

    return leads;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  return prisma.lead.findUnique({
    where: { id },
  });
}

export async function getLeadStats(): Promise<LeadStats> {
  // Get total leads
  const total = await prisma.lead.count();

  // Get status counts
  const statusCounts = await prisma.lead.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  // Get email and SMS counts
  const emailCount = await prisma.lead.count({
    where: {
      email_sent_at: { not: null },
    },
  });

  const smsCount = await prisma.lead.count({
    where: {
      sms_sent_at: { not: null },
    },
  });

  return {
    total,
    by_status: {
      received:
        statusCounts.find((s) => s.status === "received")?._count.status || 0,
      emailed: emailCount, // Use actual email sent count
      texted: smsCount, // Use actual SMS sent count
      completed:
        statusCounts.find((s) => s.status === "completed")?._count.status || 0,
      error: statusCounts.find((s) => s.status === "error")?._count.status || 0,
    },
  };
}

export async function logLeadError(
  id: string,
  error: Record<string, unknown>
): Promise<void> {
  await prisma.lead.update({
    where: { id },
    data: {
      status: "error",
      error_log: error as Prisma.JsonObject,
    },
  });
}
