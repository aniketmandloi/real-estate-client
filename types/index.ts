// Lead status enum to match database
export enum LeadStatus {
  RECEIVED = "received",
  EMAILED = "emailed",
  TEXTED = "texted",
  COMPLETED = "completed",
  ERROR = "error",
}

// Base lead interface for form input
export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  property_address: string;
  preferred_viewing_date?: string;
}

// Complete lead interface including system fields
export interface Lead extends LeadInput {
  id: string;
  status: LeadStatus;
  created_at: string;
  email_sent_at?: string;
  sms_sent_at?: string;
  completed_at?: string;
  error_log?: Record<string, unknown>;
}

// Dashboard statistics interface
export interface LeadStats {
  total: number;
  by_status: {
    [key in LeadStatus]: number;
  };
}

// API Response interfaces
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export type LeadResponse = ApiResponse<Lead>;
export type LeadsResponse = ApiResponse<Lead[]>;
export type StatsResponse = ApiResponse<LeadStats>;
