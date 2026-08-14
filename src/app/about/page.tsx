import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About · Mātru Multispeciality Hospital",
  description:
    "Rooted in legacy, built for healing — the story, motto, and leadership of Mātru Multispeciality Hospital.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutContent />
    </main>
  );
}
