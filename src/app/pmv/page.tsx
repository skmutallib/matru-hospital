import type { Metadata } from "next";
import PMVContent from "./PMVContent";

export const metadata: Metadata = {
  title: "PMV · Neighbourhood Pharma & Nursing Institutes | Mātru",
  description:
    "Beyond the hospital walls — Mātru's 24/7 in-house Neighbourhood Pharma and the Matru & LIMA Institutes of Nursing Sciences. Community care and healthcare education, the Mātru way.",
};

export default function PMVPage() {
  return (
    <main className="flex-1">
      <PMVContent />
    </main>
  );
}
