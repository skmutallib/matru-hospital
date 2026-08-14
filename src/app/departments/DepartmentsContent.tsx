"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
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

export default function DepartmentsContent() {
  const [selectedId, setSelectedId] = useState<string>(DEPARTMENTS[0].id);
  // On small screens the list and the detail are two separate "views".
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const didMountRef = useRef(false);

  const selected =
    DEPARTMENTS.find((d) => d.id === selectedId) ?? DEPARTMENTS[0];

  const openDepartment = (id: string) => {
    setSelectedId(id);
    setMobileDetailOpen(true);
  };

  // When the selected department changes, bring the explorer back into a
  // comfortable reading position — but only if the reader has scrolled away
  // from it. Scrolling to the SECTION top (a stable spot near the page top)
  // rather than the detail avoids Lenis's stale scroll-limit jumping to the
  // footer when a tall department is swapped for a short one. Uses the site's
  // Lenis instance so the motion matches the rest of the page.
  useEffect(() => {
    // Skip the first render — only react to real selection changes.
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const lenis = (
      window as unknown as {
        lenis?: {
          scrollTo: (t: HTMLElement | number, o?: { offset?: number }) => void;
          resize?: () => void;
        };
      }
    ).lenis;

    // Defer past the paint of the new (possibly much shorter) detail. Swapping
    // a tall department for a short one shrinks the page, so we must let Lenis
    // recompute its scroll bounds first — otherwise its stale limit snaps the
    // view to the footer and our scroll is ignored.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const top = section.getBoundingClientRect().top;
        const inComfortableView = top >= -40 && top <= window.innerHeight * 0.5;
        if (inComfortableView) return; // already looking at it — swap in place.

        if (lenis) {
          lenis.resize?.();
          lenis.scrollTo(section, { offset: -96 });
        } else {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      })
    );
    return () => cancelAnimationFrame(id);
  }, [selectedId]);

  return (
    <div className="depts-scope relative overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .depts-scope .reveal-el {
          opacity: 0;
          transform: translateY(28px);
          animation: depts-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes depts-rise { to { opacity: 1; transform: none; } }
        .depts-scope .detail-anim {
          animation: depts-fade 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes depts-fade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        /* Independent, slim scrollbar for the department rail (native scroll,
           kept out of Lenis via data-lenis-prevent). */
        .depts-scope .depts-list {
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
        }
        .depts-scope .depts-list::-webkit-scrollbar { width: 8px; }
        .depts-scope .depts-list::-webkit-scrollbar-track { background: transparent; }
        .depts-scope .depts-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.14);
          border-radius: 8px;
        }
        .depts-scope .depts-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.26);
        }
        @media (prefers-reduced-motion: reduce) {
          .depts-scope .reveal-el,
          .depts-scope .detail-anim { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* ===== Header ===== */}
      <section className="relative w-full overflow-hidden px-6 pb-14 pt-36 sm:px-10 sm:pb-16 sm:pt-44 lg:px-16">
        <div
          className="animate-hero-float pointer-events-none absolute -right-32 top-24 h-[32rem] w-[32rem] rounded-full bg-primary-500/12 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full bg-secondary-500/10 blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <span className="reveal-el inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Our Departments
          </span>

          <h1
            className="reveal-el mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.0] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.06s" }}
          >
            Every specialty,{" "}
            <span className="text-primary-500">under one roof.</span>
          </h1>

          <p
            className="reveal-el mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ animationDelay: "0.12s" }}
          >
            {DEPARTMENTS.length} specialities and centres of excellence. Choose a
            department to explore its care philosophy, treatments offered, and the
            specialists behind it.
          </p>
        </div>
      </section>

      {/* ===== Master · Detail ===== */}
      <section
        ref={sectionRef}
        className="relative w-full scroll-mt-24 px-6 pb-28 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(340px,380px)_1fr] lg:gap-12">
          {/* ----- List ----- */}
          <aside
            className={`${
              mobileDetailOpen ? "hidden" : "block"
            } lg:block lg:sticky lg:top-28 lg:self-start`}
          >
            <div className="mb-4 flex items-center gap-3 px-1">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Departments
              </span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-semibold text-primary-400">
                {DEPARTMENTS.length}
              </span>
            </div>

            <ul
              data-lenis-prevent
              className="depts-list reveal-el overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto"
            >
              {DEPARTMENTS.map((d, i) => {
                const active = d.id === selectedId;
                const Icon = d.Icon;
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => openDepartment(d.id)}
                      aria-current={active ? "true" : undefined}
                      className={`group flex w-full items-center gap-4 border-b border-white/[0.06] px-4 py-3.5 text-left transition-colors duration-300 last:border-b-0 ${
                        active
                          ? "bg-primary-500/10"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`font-[family-name:var(--font-display)] text-sm font-bold tabular-nums transition-colors ${
                          active ? "text-primary-400" : "text-slate-600"
                        }`}
                      >
                        {pad(i)}
                      </span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] border transition-colors duration-300 ${
                          active
                            ? "border-primary-500/40 bg-primary-500/15 text-primary-300"
                            : "border-white/10 bg-white/[0.03] text-slate-400 group-hover:border-primary-500/30 group-hover:text-primary-300"
                        }`}
                      >
                        <Icon size={20} weight="duotone" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[15px] font-semibold transition-colors ${
                            active ? "text-white" : "text-slate-200"
                          }`}
                        >
                          {d.name}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {d.specialty}
                        </span>
                      </span>
                      <ArrowUpRightIcon
                        size={16}
                        className={`shrink-0 transition-all duration-300 ${
                          active
                            ? "text-primary-400 opacity-100"
                            : "text-slate-600 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* ----- Detail ----- */}
          <div className={`${mobileDetailOpen ? "block" : "hidden"} lg:block`}>
            {/* Mobile back control */}
            <button
              type="button"
              onClick={() => setMobileDetailOpen(false)}
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-primary-400 lg:hidden"
            >
              <ArrowLeftIcon size={16} />
              All departments
            </button>

            <article
              key={selected.id}
              className="detail-anim overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02]"
            >
              {/* Detail header */}
              <header className="relative overflow-hidden border-b border-white/10 p-8 sm:p-10">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary-500/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative flex items-start gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-surface)] border border-primary-500/30 bg-primary-500/10 text-primary-300 shadow-lg shadow-primary-500/10">
                    <selected.Icon size={28} weight="duotone" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-400">
                      {selected.specialty}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
                      {selected.name}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                      {selected.tagline}
                    </p>
                  </div>
                </div>
              </header>

              <div className="space-y-12 p-8 sm:p-10">
                {/* Overview / sub-specialties */}
                <div className="space-y-9">
                  {selected.sections.map((s, i) => (
                    <div key={i}>
                      {s.heading && (
                        <h3 className="mb-4 flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-bold text-white">
                          <span className="h-4 w-1 rounded-full bg-primary-500" />
                          {s.heading}
                        </h3>
                      )}
                      <div className="space-y-4">
                        {s.body.map((p, j) => (
                          <p
                            key={j}
                            className="text-[15px] leading-relaxed text-slate-400 sm:text-base"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Treatments */}
                {selected.treatmentGroups && (
                  <div className="border-t border-white/10 pt-10">
                    <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      <span className="h-px w-6 bg-primary-500/70" />
                      Treatments Offered
                    </h3>
                    <div className="mt-6 space-y-7">
                      {selected.treatmentGroups.map((g, gi) => (
                        <div key={gi}>
                          {g.heading && (
                            <h4 className="mb-3 text-sm font-semibold text-primary-300">
                              {g.heading}
                            </h4>
                          )}
                          <ul className="flex flex-wrap gap-2">
                            {g.items.map((item) => (
                              <li
                                key={item}
                                className="rounded-[var(--radius-control)] border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] leading-snug text-slate-300 transition-colors duration-300 hover:border-primary-500/40 hover:text-white"
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

                {/* Specialists */}
                {selected.doctors && selected.doctors.length > 0 && (
                  <div className="border-t border-white/10 pt-10">
                    <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      <span className="h-px w-6 bg-primary-500/70" />
                      Our Specialists
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {selected.doctors.map((doc) => (
                        <div
                          key={doc.name}
                          className="flex items-center gap-4 rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-primary-500/30 hover:bg-white/[0.04]"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-md shadow-primary-500/25">
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

                {/* CTA */}
                <div className="border-t border-white/10 pt-8">
                  <a
                    href="#book-appointment"
                    className="group inline-flex items-center gap-3 bg-primary-500 py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all duration-300 hover:bg-primary-600 hover:shadow-lg"
                  >
                    Book an appointment
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                      <ArrowUpRightIcon size={16} />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
