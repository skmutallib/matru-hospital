"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { DEPARTMENTS, type Department } from "./data";
import TiltCard from "./TiltCard";
import BlogSection from "./BlogSection";

const pad = (n: number) => String(n + 1).padStart(2, "0");

const treatmentCount = (d: Department) =>
  d.treatmentGroups?.reduce((n, g) => n + g.items.length, 0) ?? 0;
const subSpecialtyCount = (d: Department) =>
  d.sections.filter((s) => s.heading).length;

export default function DepartmentsContent() {
  return (
    <div className="depts-scope relative overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .depts-scope .card-in {
          animation: card-in 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .depts-scope .card-in { animation: none; }
        }
      `}</style>

      {/* ===== Editorial masthead ===== */}
      <section className="relative w-full overflow-hidden px-6 pb-14 pt-36 sm:px-10 sm:pt-44 lg:px-16">
        <div
          className="animate-hero-float pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-primary-500/12 blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="animate-hero-float pointer-events-none absolute -left-40 top-40 h-[26rem] w-[26rem] rounded-full bg-secondary-500/10 blur-[150px]"
          aria-hidden="true"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 90% 55% at 30% 10%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 55% at 30% 10%, #000 40%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Centres of Excellence
            <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden text-slate-500 sm:block">
              {pad(0)}&nbsp;—&nbsp;{pad(DEPARTMENTS.length - 1)}
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              Our specialities.
              <span className="block text-primary-500">One standard of care.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-slate-400 lg:pb-3">
              A complete directory of the departments and super-specialities
              practising at Mātru. Select any speciality to explore its
              philosophy of care, the procedures offered, and the consultants
              who lead it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== The directory grid ===== */}
      <section className="relative w-full px-6 pb-4 pt-8 sm:px-10 sm:pt-12 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((d, i) => {
            const Icon = d.Icon;
            const tc = treatmentCount(d);
            const ss = subSpecialtyCount(d);
            return (
              <Link
                key={d.id}
                href={`/departments/${d.id}`}
                aria-label={`${d.specialty} — ${d.name}`}
                className="card-in group block focus-visible:outline-none"
                style={{ animationDelay: `${Math.min(i, 11) * 0.05}s` }}
              >
                <TiltCard
                  className="h-full"
                  innerClassName="flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-colors duration-300 group-hover:border-primary-500/40 group-focus-visible:border-primary-500/60 sm:p-7"
                >
                  {/* orange wash that fades in on hover, sits behind content */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[var(--radius-surface)] bg-gradient-to-br from-primary-500/12 via-transparent to-secondary-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* top row: icon medallion + index */}
                  <div
                    className="relative flex items-start justify-between"
                    style={{ transform: "translateZ(45px)" }}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-primary-300 shadow-lg shadow-black/30 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-primary-500/12 group-hover:text-primary-200">
                      <Icon size={30} weight="duotone" />
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-2xl font-bold tabular-nums text-slate-700 transition-colors duration-300 group-hover:text-primary-500/70">
                      {pad(i)}
                    </span>
                  </div>

                  {/* titles */}
                  <div
                    className="relative mt-7 flex-1"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-primary-400/90">
                      {d.specialty}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight text-white sm:text-[1.7rem]">
                      {d.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {d.tagline}
                    </p>
                  </div>

                  {/* footer: meta + explore */}
                  <div
                    className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {ss > 0 && <span>{ss} Sub-specialities</span>}
                      {tc > 0 && (
                        <>
                          {ss > 0 && <span className="h-3 w-px bg-white/15" />}
                          <span>{tc} Treatments</span>
                        </>
                      )}
                      {ss === 0 && tc === 0 && d.doctors && (
                        <span>
                          {d.doctors.length}{" "}
                          {d.doctors.length === 1 ? "Consultant" : "Consultants"}
                        </span>
                      )}
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 transition-all duration-300 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                      <ArrowUpRightIcon size={17} weight="bold" />
                    </span>
                  </div>
                </TiltCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== Journal / blog ===== */}
      <BlogSection />
    </div>
  );
}
