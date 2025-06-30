import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";

import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Real Estate Lead Management",
  description: "Professional real estate property viewing scheduling system",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
