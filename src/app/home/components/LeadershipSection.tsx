"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Leader = {
  tag: string;
  specialty: string;
  name: string;
  role: string;
  achievement: string;
};

const LEADERS: Leader[] = [
  {
    tag: "Founder",
    specialty: "Internal Medicine",
    name: "Dr. Krishna Rajendra",
    role: "Founder | Internal Medicine",
    achievement: "40+ years of care",
  },
  {
    tag: "Chairman",
    specialty: "Orthopaedics",
    name: "Dr. Mahendra",
    role: "Chairman | Orthopaedic Surgeon",
    achievement: "5,000+ surgeries",
  },
  {
    tag: "CEO",
    specialty: "Fertility & IVF",
    name: "Dr. Preeti Mahendra",
    role: "CEO | Founder, Matru Garbhadatri",
    achievement: "1,000+ IVF successes",
  },
];

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = gsap.utils.toArray<HTMLElement>(".leader-card", el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(cards, { yPercent: 0 });
      return;
    }

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Each card sits fully below its frame (clipped by the slot's
      // overflow-hidden), so it slides up into view — no fade, no pop.
      gsap.set(cards, { yPercent: 100 });

      // Automatic on first enter only: one profile slides fully up, then the
      // next — and it stays put (does not reset/replay on scroll-back).
      ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        once: true,
        onEnter: () =>
          gsap.to(cards, {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.75, // wait for one to arrive before the next starts
            overwrite: true,
          }),
      });

      // Hover: the round arrow morphs into an achievement pill.
      const ctas = gsap.utils.toArray<HTMLElement>(".leader-cta", el);
      ctas.forEach((cta) => {
        const text = cta.querySelector<HTMLElement>(".cta-text");
        const arrow = cta.querySelector<HTMLElement>(".cta-arrow");
        gsap.set(text, { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 });
        gsap.set(arrow, { rotate: -45 }); // right-arrow rendered as up-right

        const tl = gsap.timeline({
          paused: true,
          defaults: { duration: 0.45, ease: "power3.out" },
        });
        tl.to(text, { width: "auto", opacity: 1, paddingLeft: 16, paddingRight: 4 }, 0)
          .to(arrow, { rotate: 0 }, 0);

        const enter = () => tl.play();
        const leave = () => tl.reverse();
        cta.addEventListener("mouseenter", enter);
        cta.addEventListener("mouseleave", leave);
        cta.addEventListener("focus", enter);
        cta.addEventListener("blur", leave);
        cleanups.push(() => {
          cta.removeEventListener("mouseenter", enter);
          cta.removeEventListener("mouseleave", leave);
          cta.removeEventListener("focus", enter);
          cta.removeEventListener("blur", leave);
        });
      });
    }, sectionRef);

    // Trigger positions are measured wrong while the preloader locks the
    // page, so recalc once it releases (and after assets/layout settle).
    const refresh = () => ScrollTrigger.refresh();
    const w = window as unknown as { __matruIntroReady?: boolean };
    if (w.__matruIntroReady) requestAnimationFrame(refresh);
    else window.addEventListener("matru:intro", refresh);
    window.addEventListener("load", refresh);
    const fallback = window.setTimeout(refresh, 1800);

    return () => {
      window.removeEventListener("matru:intro", refresh);
      window.removeEventListener("load", refresh);
      window.clearTimeout(fallback);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#0a0b0d] py-24 sm:py-32">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div data-reveal>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Leadership
          </h2>
          <p className="mt-3 max-w-md text-base text-neutral-400">
            The people shaping preventive-focused care at Mātru.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((leader) => (
            // Slot clips the card so it can slide up out of its own frame.
            <div
              key={leader.name}
              className="leader-slot relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]"
            >
              <article className="leader-card absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-800">
                {/* Demo profile photo (dark placeholder) */}
                <img
                  src="/doctor-placeholder-dark.png"
                  alt={leader.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />

                {/* Top pills */}
                <span className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-white/15 backdrop-blur-md">
                  {leader.tag}
                </span>
                <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-white/15 backdrop-blur-md">
                  {leader.specialty}
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                </span>

                {/* Bottom overlay: name + designation */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-600 via-primary-500/70 to-transparent p-5 pt-16">
                  <h3 className="max-w-[65%] text-lg font-bold leading-tight text-white">
                    {leader.name}
                  </h3>
                  <p className="mt-1 max-w-[65%] text-sm text-white/85">{leader.role}</p>
                </div>

                {/* Arrow button → morphs into achievement pill on hover */}
                <a
                  href="#leadership"
                  aria-label={`${leader.name} — ${leader.achievement}`}
                  className="leader-cta absolute bottom-5 right-5 z-20 inline-flex h-11 items-center overflow-hidden rounded-full bg-white text-primary-600 shadow-md"
                >
                  <span className="cta-text whitespace-nowrap text-sm font-semibold">
                    {leader.achievement}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                    <svg
                      className="cta-arrow h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 10h11M11 5l5 5-5 5" />
                    </svg>
                  </span>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
