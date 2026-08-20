import type { Metadata } from "next";
import JournalContent from "./JournalContent";

export const metadata: Metadata = {
  title: "The Journal · Mātru Multispeciality Hospital",
  description:
    "Evidence-led writing from the doctors and specialists at Mātru — on prevention, recovery, and living well between visits.",
};

export default function JournalPage() {
  return (
    <main className="flex-1">
      <JournalContent />
    </main>
  );
}
