"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Dept = {
  title: string;
  items: string[];
  bg: string;
};

const DEPARTMENTS: Dept[] = [
  {
    title: "Women & Child Health",
    items: [
      "Maternity & childbirth",
      "IVF & fertility",
      "PCOS & endometriosis",
      "NICU / PICU",
    ],
    bg: "bg-gradient-to-br from-secondary-800 to-secondary-900",
  },
  {
    title: "Surgery & Critical Care",
    items: ["Emergency 24x7", "General surgery", "ICU care", "Laparoscopy / laser"],
    bg: "bg-gradient-to-br from-primary-500 to-primary-600",
  },
  {
    title: "Orthopaedics & Spine",
    items: ["Trauma care", "Joint replacement", "Spine surgery", "Rehabilitation"],
    bg: "bg-gradient-to-br from-secondary-600 to-secondary-700",
  },
  {
    title: "Diagnostics & Wellness",
    items: [
      "3D ultrasound",
      "Lab / X-ray / Echo",
      "Health checks",
      "Diet & weight management",
    ],
    bg: "bg-gradient-to-br from-primary-600 to-primary-700",
  },
  {
    title: "Cosmetic & Aesthetic",
    items: [
      "Cosmetic gynaecology",
      "Plastic surgery",
      "Hair transplant",
      "Body contouring",
    ],
    bg: "bg-gradient-to-br from-secondary-700 to-secondary-800",
  },
  {
    title: "Supporting Specialities",
    items: [
      "Urology / nephrology",
      "Neurology / neurosurgery",
      "Psychology / psychiatry",
      "Pharmacy",
    ],
    bg: "bg-gradient-to-br from-primary-400 to-primary-500",
  },
];

const TOP_BASE = 120; // px — where cards come to rest (below floating navbar)
const TOP_STEP = 26; // px — peek of each stacked card

export default function SpecialitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".dept-wrap");

      wrappers.forEach((wrap, i) => {
        // The last card is never covered, so it doesn't shrink.
        if (i === wrappers.length - 1) return;
        const card = wrap.querySelector<HTMLElement>(".dept-card");
        if (!card) return;

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: `top ${TOP_BASE + i * TOP_STEP}px`,
            end: `+=${wrap.offsetHeight}`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Header — image 2 style */}
        <span data-reveal className="inline-flex items-center rounded-full bg-primary-500 px-4 py-1.5 text-sm font-semibold text-white">
          Our Specialities
        </span>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 data-reveal className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-secondary-900 sm:text-5xl lg:text-6xl">
            Comprehensive care,
            <br />
            across every speciality.
          </h2>
          <p data-reveal className="max-w-sm text-base leading-relaxed text-slate-500 lg:text-lg">
            From maternity and critical care to diagnostics and cosmetic surgery
            — expert teams and modern facilities, all under one roof.
          </p>
        </div>

        {/* Stacking cards */}
        <div className="mt-16">
          {DEPARTMENTS.map((dept, i) => (
            <div
              key={dept.title}
              className="dept-wrap sticky"
              style={{ top: `${TOP_BASE + i * TOP_STEP}px` }}
            >
              <div
                className={`dept-card mb-6 flex min-h-[22rem] flex-col justify-between rounded-[2rem] p-8 text-white shadow-2xl sm:p-12 ${dept.bg}`}
                style={{ transformOrigin: "center top" }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-white/60">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-sm text-white/60">
                    / 0{DEPARTMENTS.length}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                    {dept.title}
                  </h3>
                  <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {dept.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-base text-white/90 sm:text-lg"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
