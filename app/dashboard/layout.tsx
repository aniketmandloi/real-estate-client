import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Management Dashboard | Real Estate Leads",
  description:
    "Real-time dashboard for managing and tracking property viewing requests",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto px-4 py-8">{children}</div>;
}
