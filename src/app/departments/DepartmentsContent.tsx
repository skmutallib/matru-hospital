"use client";

import { useRef, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { DEPARTMENTS, type Department } from "./data";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  const letters =
    words.length > 1
      ? words[words.length - 2][0] + words[words.length - 1][0]
      : words[0]?.[0] ?? "";
  return letters.toUpperCase();
}

const treatmentCount = (d: Department) =>
  d.treatmentGroups?.reduce((n, g) => n + g.items.length, 0) ?? 0;
const subSpecialtyCount = (d: Department) =>
  d.sections.filter((s) => s.heading).length;

export default function DepartmentsContent() {
  // Editorial index: one department expands in place at a time. First open.
  const [openId, setOpenId] = useState<string | null>(DEPARTMENTS[0].id);
  const headRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const settleTimer = useRef<number | null>(null);

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (!next) return;
    // Frame the opened department's header just below the navbar — but only
    // AFTER the expand/collapse height transition finishes, so the reflow
    // (a taller sibling above collapsing) has settled and the header's final
    // position is stable. Then a single smooth Lenis pass lands it cleanly.
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const el = headRefs.current[next];
      if (!el) return;
      const lenis = (
        window as unknown as {
          lenis?: {
            scrollTo: (t: HTMLElement, o?: { offset?: number }) => void;
            resize?: () => void;
          };
        }
      ).lenis;
      if (lenis) {
        lenis.resize?.();
        lenis.scrollTo(el, { offset: -96 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 540);
  };

  return (
    <div className="depts-scope relative overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .depts-scope .idx-row {
          animation: idx-in 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes idx-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }

        /* Inline expand via animatable grid rows — no fixed max-height hacks. */
        .depts-scope .idx-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.52s cubic-bezier(0.16,1,0.3,1);
        }
        .depts-scope .idx-panel.open { grid-template-rows: 1fr; }
        .depts-scope .idx-panel > .idx-panel-clip { overflow: hidden; min-height: 0; }
        .depts-scope .idx-panel-inner {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .depts-scope .idx-panel.open .idx-panel-inner {
          opacity: 1;
          transform: none;
          transition-delay: 0.14s;
        }

        /* Bespoke + / × toggle drawn from two rules. */
        .depts-scope .plus { position: relative; }
        .depts-scope .plus::before,
        .depts-scope .plus::after {
          content: "";
          position: absolute;
          inset: 50% 0 auto 0;
          height: 1.5px;
          background: currentColor;
          transform: translateY(-50%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .depts-scope .plus::after { transform: translateY(-50%) rotate(90deg); }
        .depts-scope .plus[data-open="true"]::before { transform: translateY(-50%) rotate(135deg); }
        .depts-scope .plus[data-open="true"]::after { transform: translateY(-50%) rotate(45deg); }

        /* Oversized outline numeral watermark inside an open row. */
        .depts-scope .ghost-index {
          font-family: var(--font-display);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.06);
        }

        @media (prefers-reduced-motion: reduce) {
          .depts-scope .idx-row { animation: none; }
          .depts-scope .idx-panel { transition: none; }
          .depts-scope .idx-panel-inner { transition: none; opacity: 1; transform: none; }
          .depts-scope .plus::before, .depts-scope .plus::after { transition: none; }
        }
      `}</style>

      {/* ===== Editorial masthead ===== */}
      <section className="relative w-full overflow-hidden px-6 pb-12 pt-36 sm:px-10 sm:pt-44 lg:px-16">
        <div
          className="animate-hero-float pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-primary-500/12 blur-[160px]"
          aria-hidden="true"
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
              Index 01&nbsp;—&nbsp;{pad(DEPARTMENTS.length - 1)}
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              Twenty specialities.
              <span className="block text-primary-500">One standard of care.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-slate-400 lg:pb-3">
              A complete directory of the departments and super-specialities
              practising at Mātru. Open any entry to read its philosophy of care,
              the procedures offered, and the consultants who lead it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== The directory ===== */}
      <section className="relative w-full px-6 pb-28 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-7xl border-t border-white/12">
          {DEPARTMENTS.map((d, i) => {
            const open = openId === d.id;
            const Icon = d.Icon;
            const tc = treatmentCount(d);
            const ss = subSpecialtyCount(d);
            return (
              <div
                key={d.id}
                className="idx-row scroll-mt-24 border-b border-white/12"
                style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
              >
                {/* ---- Row header (button) ---- */}
                <button
                  type="button"
                  ref={(el) => {
                    headRefs.current[d.id] = el;
                  }}
                  onClick={() => toggle(d.id)}
                  aria-expanded={open}
                  className="group relative flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
                >
                  {/* hover / active accent bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 bg-primary-500 transition-all duration-500 ${
                      open ? "h-[62%]" : "group-hover:h-[42%]"
                    }`}
                  />
                  {/* index numeral */}
                  <span
                    className={`shrink-0 pl-3 font-[family-name:var(--font-display)] text-xl font-bold tabular-nums transition-colors duration-300 sm:pl-6 sm:text-2xl ${
                      open
                        ? "text-primary-500"
                        : "text-slate-600 group-hover:text-primary-400"
                    }`}
                  >
                    {pad(i)}
                  </span>

                  {/* icon */}
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-14 sm:w-14 ${
                      open
                        ? "border-primary-500/50 bg-primary-500/12 text-primary-300"
                        : "border-white/12 bg-white/[0.02] text-slate-400 group-hover:border-primary-500/40 group-hover:text-primary-300"
                    }`}
                  >
                    <Icon size={26} weight="duotone" />
                  </span>

                  {/* titles */}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 transition-colors duration-300 group-hover:text-primary-400/80">
                      {d.specialty}
                    </span>
                    <span
                      className={`mt-1 block font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 sm:text-4xl lg:text-[2.75rem] ${
                        open ? "text-white" : "text-slate-200 group-hover:text-white"
                      }`}
                    >
                      {d.name}
                    </span>
                  </span>

                  {/* toggle */}
                  <span
                    className={`plus mr-2 hidden h-5 w-5 shrink-0 transition-colors duration-300 sm:mr-4 sm:block ${
                      open ? "text-primary-500" : "text-slate-500 group-hover:text-white"
                    }`}
                    data-open={open}
                    aria-hidden="true"
                  />
                </button>

                {/* ---- Expanding detail ---- */}
                <div className={`idx-panel ${open ? "open" : ""}`}>
                  <div className="idx-panel-clip">
                    <div className="idx-panel-inner relative pb-12 pl-3 sm:pl-6 lg:pb-16">
                      {/* watermark numeral */}
                      <span
                        className="ghost-index pointer-events-none absolute -top-4 right-0 select-none text-[7rem] leading-none sm:text-[10rem] lg:text-[13rem]"
                        aria-hidden="true"
                      >
                        {pad(i)}
                      </span>

                      {/* meta strip */}
                      <div className="relative flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {ss > 0 && <span>{ss} Sub-specialities</span>}
                        {tc > 0 && (
                          <>
                            {ss > 0 && <span className="h-3 w-px bg-white/15" />}
                            <span>{tc} Treatments</span>
                          </>
                        )}
                        {d.doctors && d.doctors.length > 0 && (
                          <>
                            <span className="h-3 w-px bg-white/15" />
                            <span>
                              {d.doctors.length}{" "}
                              {d.doctors.length === 1 ? "Consultant" : "Consultants"}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="relative mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-[1.05fr_0.95fr]">
                        {/* Overview + sub-specialties */}
                        <div className="space-y-8">
                          {d.sections.map((s, si) => (
                            <div key={si}>
                              {s.heading && (
                                <h3 className="mb-3 flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-bold text-white">
                                  <span className="h-4 w-1 rounded-full bg-primary-500" />
                                  {s.heading}
                                </h3>
                              )}
                              <div className="space-y-4">
                                {s.body.map((p, pi) => (
                                  <p
                                    key={pi}
                                    className="max-w-2xl text-[15px] leading-relaxed text-slate-400"
                                  >
                                    {p}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}

                          <a
                            href="#book-appointment"
                            className="group/cta mt-2 inline-flex items-center gap-3 bg-primary-500 py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all duration-300 hover:bg-primary-600 hover:shadow-lg"
                          >
                            Consult {d.name}
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-colors duration-300 group-hover/cta:bg-white/20">
                              <ArrowUpRightIcon size={16} />
                            </span>
                          </a>
                        </div>

                        {/* Treatments + consultants */}
                        <div className="space-y-10">
                          {d.treatmentGroups && (
                            <div>
                              <h3 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                <span className="h-px w-6 bg-primary-500/70" />
                                Treatments Offered
                              </h3>
                              <div className="mt-5 space-y-6">
                                {d.treatmentGroups.map((g, gi) => (
                                  <div key={gi}>
                                    {g.heading && (
                                      <h4 className="mb-2.5 text-sm font-semibold text-primary-300">
                                        {g.heading}
                                      </h4>
                                    )}
                                    <ul className="flex flex-wrap gap-2">
                                      {g.items.map((item) => (
                                        <li
                                          key={item}
                                          className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[13px] leading-snug text-slate-300 transition-colors duration-300 hover:border-primary-500/40 hover:text-white"
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
                              <h3 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                <span className="h-px w-6 bg-primary-500/70" />
                                Consultants
                              </h3>
                              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {d.doctors.map((doc) => (
                                  <div
                                    key={doc.name}
                                    className="flex items-center gap-3.5 rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-primary-500/30 hover:bg-white/[0.04]"
                                  >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-[family-name:var(--font-display)] text-xs font-bold text-white shadow-md shadow-primary-500/25">
                                      {monogram(doc.name)}
                                    </span>
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-semibold text-white">
                                        {doc.name}
                                      </p>
                                      <p className="truncate text-xs text-slate-400">
                                        {doc.role}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
