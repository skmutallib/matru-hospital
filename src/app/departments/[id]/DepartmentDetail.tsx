"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { DEPARTMENTS } from "../data";
import TiltCard from "../TiltCard";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  const letters =
    words.length > 1
      ? words[words.length - 2][0] + words[words.length - 1][0]
      : words[0]?.[0] ?? "";
  return letters.toUpperCase();
}

export default function DepartmentDetail({ id }: { id: string }) {
  const index = DEPARTMENTS.findIndex((d) => d.id === id);
  if (index === -1) return null;
  const d = DEPARTMENTS[index];
  const Icon = d.Icon;

  // Wrap-around neighbours for the footer pager.
  const prev = DEPARTMENTS[(index - 1 + DEPARTMENTS.length) % DEPARTMENTS.length];
  const next = DEPARTMENTS[(index + 1) % DEPARTMENTS.length];

  const treatmentCount =
    d.treatmentGroups?.reduce((n, g) => n + g.items.length, 0) ?? 0;
  const subSpecialtyCount = d.sections.filter((s) => s.heading).length;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f6f7f9] text-slate-800 [color-scheme:light]">
      {/* ===== Hero ===== */}
      <section className="relative w-full overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <div
          className="animate-hero-float pointer-events-none absolute -right-40 -top-10 h-[40rem] w-[40rem] rounded-full bg-primary-500/12 blur-[170px]"
          aria-hidden="true"
        />
        <div
          className="animate-hero-float pointer-events-none absolute -left-40 top-52 h-[30rem] w-[30rem] rounded-full bg-secondary-500/10 blur-[160px]"
          aria-hidden="true"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 85% 55% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 55% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* breadcrumb / back */}
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <Link
              href="/departments"
              className="group inline-flex items-center gap-2 text-slate-600 transition-colors duration-300 hover:text-primary-600"
            >
              <ArrowLeftIcon
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              All Departments
            </Link>
            <span className="h-3 w-px bg-slate-300" />
            <span className="text-slate-400">
              {pad(index)} / {pad(DEPARTMENTS.length - 1)}
            </span>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* left — titles */}
            <div>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-600">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                Centre of Excellence
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {d.specialty}
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                {d.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                {d.tagline}
              </p>

              {/* meta chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                {subSpecialtyCount > 0 && (
                  <Stat value={subSpecialtyCount} label="Sub-specialities" />
                )}
                {treatmentCount > 0 && (
                  <Stat value={treatmentCount} label="Treatments" />
                )}
                {d.doctors && d.doctors.length > 0 && (
                  <Stat
                    value={d.doctors.length}
                    label={d.doctors.length === 1 ? "Consultant" : "Consultants"}
                  />
                )}
              </div>

              <a
                href="#book-appointment"
                className="group mt-9 inline-flex items-center gap-3 bg-primary-500 py-3 pl-6 pr-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:bg-primary-600 hover:shadow-xl"
              >
                Book a consultation
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 bg-white/15 transition-colors duration-300 group-hover:bg-white/25">
                  <ArrowUpRightIcon size={16} weight="bold" />
                </span>
              </a>
            </div>

            {/* right — 3D medallion */}
            <div className="relative flex justify-center lg:justify-end">
              <TiltCard
                max={14}
                className="w-full max-w-sm"
                innerClassName="relative aspect-square overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-primary-50 shadow-[0_45px_90px_-35px_rgba(245,131,37,0.4)]"
              >
                {/* ambient orange glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,131,37,0.18),transparent_62%)]"
                />
                {/* ghost numeral */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-6 -right-2 select-none font-[family-name:var(--font-display)] text-[13rem] font-extrabold leading-none text-transparent"
                  style={{
                    WebkitTextStroke: "1px rgba(15,23,42,0.07)",
                    transform: "translateZ(20px)",
                  }}
                >
                  {pad(index)}
                </span>

                {/* floating icon disc */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: "translateZ(70px)" }}
                >
                  <span className="flex h-32 w-32 items-center justify-center rounded-[2rem] border border-primary-400/60 bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-[0_24px_50px_-12px_rgba(245,131,37,0.65)] sm:h-36 sm:w-36">
                    <Icon size={72} weight="duotone" />
                  </span>
                </div>

                {/* small accent orbs at depth */}
                <span
                  aria-hidden="true"
                  className="animate-hero-float absolute left-8 top-10 h-3 w-3 rounded-full bg-primary-500 shadow-[0_0_20px_4px_rgba(245,131,37,0.45)]"
                  style={{ transform: "translateZ(90px)" }}
                />
                <span
                  aria-hidden="true"
                  className="animate-hero-float absolute bottom-12 left-14 h-2 w-2 rounded-full bg-secondary-500 shadow-[0_0_16px_3px_rgba(22,188,191,0.45)]"
                  style={{ transform: "translateZ(110px)", animationDelay: "-4s" }}
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Body ===== */}
      <section className="relative w-full px-6 pb-24 mt-10 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-x-16 gap-y-14 border-t border-slate-200 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* overview + sub-specialities */}
          <div data-reveal className="space-y-10">
            <h2 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              <span className="h-px w-6 bg-primary-500" />
              Overview
            </h2>
            {d.sections.map((s, si) => (
              <div key={si}>
                {s.heading && (
                  <h3 className="mb-3 flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-bold text-slate-900">
                    <span className="h-4 w-1 rounded-full bg-primary-500" />
                    {s.heading}
                  </h3>
                )}
                <div className="space-y-4">
                  {s.body.map((p, pi) => (
                    <p
                      key={pi}
                      className="max-w-2xl text-[15px] leading-relaxed text-slate-600"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* treatments + consultants */}
          <div data-reveal className="space-y-12">
            {d.treatmentGroups && (
              <div>
                <h2 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  <span className="h-px w-6 bg-primary-500" />
                  Treatments Offered
                </h2>
                <div className="mt-6 space-y-6">
                  {d.treatmentGroups.map((g, gi) => (
                    <div key={gi}>
                      {g.heading && (
                        <h3 className="mb-3 text-sm font-semibold text-primary-700">
                          {g.heading}
                        </h3>
                      )}
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] leading-snug text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary-400 hover:text-primary-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {d.doctors && d.doctors.length > 0 && (
              <div>
                <h2 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  <span className="h-px w-6 bg-primary-500" />
                  Consultants
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {d.doctors.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center gap-3.5 rounded-[var(--radius-surface)] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-md"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-[family-name:var(--font-display)] text-xs font-bold text-white shadow-md shadow-primary-500/25">
                        {monogram(doc.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {doc.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {doc.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA card */}
            <div className="bg-brand-gradient relative overflow-hidden rounded-[var(--radius-surface)] p-7 shadow-lg shadow-primary-500/20">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:12px_12px]"
              />
              <div className="relative">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  Consult {d.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90">
                  Speak with our {d.specialty} team. We&apos;ll help you find the
                  right specialist and the earliest available appointment.
                </p>
                <a
                  href="#book-appointment"
                  className="group mt-6 inline-flex items-center gap-3 bg-white py-2.5 pl-5 pr-2.5 text-sm font-semibold text-primary-700 shadow-md transition-all duration-300 hover:bg-primary-50"
                >
                  Book appointment
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-200 bg-primary-100 text-primary-700 transition-colors duration-300 group-hover:bg-primary-200">
                    <ArrowUpRightIcon size={16} weight="bold" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Prev / next pager ===== */}
      <section className="relative w-full px-6 pb-28 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-4 border-t border-slate-200 pt-10 sm:grid-cols-2">
          <PagerLink dept={prev} direction="prev" />
          <PagerLink dept={next} direction="next" />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-[var(--radius-surface)] border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-600">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function PagerLink({
  dept,
  direction,
}: {
  dept: (typeof DEPARTMENTS)[number];
  direction: "prev" | "next";
}) {
  const Icon = dept.Icon;
  const isNext = direction === "next";
  return (
    <Link
      href={`/departments/${dept.id}`}
      className={`group flex items-center gap-4 rounded-[var(--radius-surface)] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-md ${
        isNext ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:border-primary-300 group-hover:bg-primary-100">
        <Icon size={24} weight="duotone" />
      </span>
      <span className={`min-w-0 flex-1 ${isNext ? "sm:pr-0" : ""}`}>
        <span
          className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 ${
            isNext ? "sm:justify-end" : ""
          }`}
        >
          {!isNext && (
            <ArrowLeftIcon
              size={13}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          )}
          {isNext ? "Next" : "Previous"}
          {isNext && (
            <ArrowRightIcon
              size={13}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          )}
        </span>
        <span className="mt-1 block truncate font-[family-name:var(--font-display)] text-lg font-bold text-slate-900">
          {dept.name}
        </span>
        <span className="block truncate text-xs text-slate-500">
          {dept.specialty}
        </span>
      </span>
    </Link>
  );
}
