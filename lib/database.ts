import { prisma } from "./prisma";
import { Prisma, Lead as PrismaLead, LeadStatus } from "@prisma/client";

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
>;
type LeadStats = { total: number; by_status: Record<LeadStatus, number> };

export async function createLead(data: LeadInput): Promise<Lead> {
  return prisma.lead.create({
    data: {
      ...data,
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

export async function getLeads(
  options: {
    status?: LeadStatus;
    page?: number;
    limit?: number;
  } = {}
): Promise<Lead[]> {
  const { status, page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  return prisma.lead.findMany({
    where: status ? { status } : undefined,
    orderBy: { created_at: "desc" },
    skip,
    take: limit,
  });
}

export async function getLeadById(id: string): Promise<Lead | null> {
  return prisma.lead.findUnique({
    where: { id },
  });
}

export async function getLeadStats(): Promise<LeadStats> {
  const stats = await prisma.lead.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const total = await prisma.lead.count();

  return {
    total,
    by_status: stats.reduce(
      (acc, { status, _count }) => {
        acc[status] = _count.status;
        return acc;
      },
      {
        received: 0,
        emailed: 0,
        texted: 0,
        completed: 0,
        error: 0,
      }
    ),
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
