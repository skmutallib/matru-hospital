import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials · Mātru Multispeciality Hospital",
  description:
    "Real voices, real recoveries. Read and watch what patients say about their care at Mātru — video reviews, written testimonials, and verified patient reviews across every speciality.",
};

export default function TestimonialsPage() {
  return (
    <main className="flex-1">
      <TestimonialsContent />
    </main>
  );
}
