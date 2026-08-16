import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEPARTMENTS } from "../data";
import DepartmentDetail from "./DepartmentDetail";

export function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/departments/[id]">): Promise<Metadata> {
  const { id } = await params;
  const dept = DEPARTMENTS.find((d) => d.id === id);
  if (!dept) return { title: "Department not found · Mātru" };
  return {
    title: `${dept.specialty} · Mātru Multispeciality Hospital`,
    description: `${dept.tagline} Explore ${dept.specialty} at Mātru — the philosophy of care, treatments offered, and the consultants who lead the department.`,
  };
}

export default async function DepartmentPage({
  params,
}: PageProps<"/departments/[id]">) {
  const { id } = await params;
  const dept = DEPARTMENTS.find((d) => d.id === id);
  if (!dept) notFound();

  return (
    <main className="flex-1">
      <DepartmentDetail id={id} />
    </main>
  );
}
