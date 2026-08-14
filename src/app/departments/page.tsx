import type { Metadata } from "next";
import DepartmentsContent from "./DepartmentsContent";

export const metadata: Metadata = {
  title: "Departments · Mātru Multispeciality Hospital",
  description:
    "Explore every speciality at Mātru — from Orthopaedics & Spine Surgery to Cardiology, Oncology, Neurology, and more. Discover treatments offered and the specialists behind each department.",
};

export default function DepartmentsPage() {
  return (
    <main className="flex-1">
      <DepartmentsContent />
    </main>
  );
}
