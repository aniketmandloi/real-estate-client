import { LeadStatus } from "@/types";

export const LEAD_STATUS_CONFIG = {
  [LeadStatus.RECEIVED]: {
    label: "Received",
    color: "bg-blue-100 text-blue-800",
  },
  [LeadStatus.EMAILED]: {
    label: "Email Sent",
    color: "bg-yellow-100 text-yellow-800",
  },
  [LeadStatus.TEXTED]: {
    label: "SMS Sent",
    color: "bg-purple-100 text-purple-800",
  },
  [LeadStatus.COMPLETED]: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
  },
  [LeadStatus.ERROR]: {
    label: "Error",
    color: "bg-red-100 text-red-800",
  },
};

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

export const POLLING_INTERVAL = 5000; // 5 seconds

export const API_ENDPOINTS = {
  LEADS: "/api/leads",
  WEBHOOK: "/api/webhook",
  STATS: "/api/leads/stats",
} as const;
