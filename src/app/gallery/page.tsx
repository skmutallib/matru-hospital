import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery · Mātru Multispeciality Hospital",
  description:
    "Inside Mātru — a visual journal of our facilities, surgical suites, maternity wing, technology, and the moments of care that define us.",
};

export default function GalleryPage() {
  return (
    <main className="flex-1">
      <GalleryContent />
    </main>
  );
}
