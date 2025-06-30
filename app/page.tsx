import { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Schedule a Property Viewing | Real Estate Lead Management",
  description:
    "Schedule a viewing of your dream property. Our real estate team will contact you to arrange the perfect time.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HeroSection />
      <section className="container mx-auto px-4 py-12">
        <LeadForm />
      </section>
    </main>
  );
}
