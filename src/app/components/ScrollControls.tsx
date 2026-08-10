"use client";

import { useEffect, useRef } from "react";

const R = 20; // progress ring radius
const CIRC = 2 * Math.PI * R;

type LenisLike = { scrollTo: (target: number, opts?: { duration?: number }) => void };

export default function ScrollControls() {
  const ringRef = useRef<SVGCircleElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;

      // Drive the ring directly (no React re-render per scroll frame).
      const ring = ringRef.current;
      if (ring) ring.style.strokeDashoffset = String(CIRC * (1 - p));

      // Fade the back-to-top control in once the user has scrolled a little.
      const btn = btnRef.current;
      if (btn) {
        const show = window.scrollY > 160;
        btn.style.opacity = show ? "1" : "0";
        btn.style.transform = show ? "translateY(0)" : "translateY(8px)";
        btn.style.pointerEvents = show ? "auto" : "none";
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Back to top — ring fills with scroll progress */}
      <button
        ref={btnRef}
        onClick={toTop}
        aria-label="Back to top"
        style={{ opacity: 0, transform: "translateY(8px)", pointerEvents: "none", transition: "opacity 300ms ease, transform 300ms ease" }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl hover:bg-black/70"
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
        <svg
          className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>

      {/* Watch brand film — sticky throughout */}
      <a
        href="#brand-film"
        aria-label="Watch brand film"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-[0_14px_34px_-8px_rgba(0,0,0,0.85)] transition-colors duration-300 hover:bg-primary-600"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary-500/25" aria-hidden="true" />
        <svg className="relative h-5 w-5 translate-x-[1px]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
        </svg>
        {/* Hover label */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          Watch brand film
        </span>
      </a>
    </div>
  );
}
