"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Play } from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

const R = 20; // progress ring radius
const CIRC = 2 * Math.PI * R;

type LenisLike = { scrollTo: (target: number, opts?: { duration?: number }) => void };

export default function ScrollControls() {
  const ringRef = useRef<SVGCircleElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Drive the progress ring + back-to-top visibility from ScrollTrigger's
    // batched scroll handling instead of a raw scroll listener (Skill 5.D).
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const ring = ringRef.current;
        if (ring) ring.style.strokeDashoffset = String(CIRC * (1 - p));

        const btn = btnRef.current;
        if (btn) {
          const show = self.scroll() > 160;
          btn.style.opacity = show ? "1" : "0";
          btn.style.transform = show ? "translateY(0)" : "translateY(8px)";
          btn.style.pointerEvents = show ? "auto" : "none";
        }
      },
    });

    return () => st.kill();
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to top - ring fills with scroll progress */}
      <button
        ref={btnRef}
        onClick={toTop}
        aria-label="Back to top"
        style={{
          opacity: 0,
          transform: "translateY(8px)",
          pointerEvents: "none",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[#15171A]/80 text-white backdrop-blur-md transition-colors hover:bg-[#1B1E22]"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r={R} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/12" />
          <circle
            ref={ringRef}
            cx="26"
            cy="26"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary-500"
            style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC, transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <ArrowUp size={20} weight="bold" className="relative transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>

      {/* Watch brand film */}
      <a
        href="#brand-film"
        aria-label="Watch brand film"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white transition-colors duration-200 hover:bg-primary-600"
      >
        <Play size={20} weight="fill" className="translate-x-px" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-[10px] border border-white/12 bg-[#15171A] px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Watch brand film
        </span>
      </a>
    </div>
  );
}
