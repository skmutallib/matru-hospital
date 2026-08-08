"use client";

import { useEffect, useState } from "react";

const WORD = "matru";
const DURATION = 2200;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const finish = () => {
      setExiting(true);
      window.setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
      }, 950);
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setCount(100);
      finish();
      return () => {
        document.body.style.overflow = "";
      };
    }

    let raf = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const p = Math.min((now - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-brand-gradient text-white",
        "transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform",
        exiting ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={exiting}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Top label */}
      <div className="relative flex items-center justify-between px-6 pt-8 text-xs font-medium uppercase tracking-[0.3em] text-white/70 sm:px-10">
        <span>Mātru Hospital</span>
        <span className="hidden sm:inline">Preventive meets cure</span>
      </div>

      {/* Center wordmark */}
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="flex overflow-hidden">
          {WORD.split("").map((letter, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                className="animate-preloader-letter inline-block text-[22vw] font-bold leading-none tracking-tight drop-shadow-[0_8px_40px_rgba(0,0,0,0.15)] sm:text-[16vw] lg:text-[13vw]"
                style={{ animationDelay: `${0.1 + i * 0.09}s` }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-4 flex items-center gap-4 overflow-hidden sm:mt-6">
          <span
            className="animate-preloader-letter h-px w-10 bg-white/40 sm:w-16"
            style={{ animationDelay: "0.65s" }}
            aria-hidden="true"
          />
          <span
            className="animate-preloader-letter text-[3.4vw] font-light uppercase tracking-[0.35em] text-white/85 sm:text-lg lg:text-xl"
            style={{ animationDelay: "0.7s" }}
          >
            Multispecialist Hospital
          </span>
          <span
            className="animate-preloader-letter h-px w-10 bg-white/40 sm:w-16"
            style={{ animationDelay: "0.65s" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Bottom: progress + counter */}
      <div className="relative px-6 pb-10 sm:px-10">
        <div className="flex items-end justify-between">
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/70">
            Loading
          </span>
          <span className="text-5xl font-bold tabular-nums leading-none sm:text-7xl">
            {count}
            <span className="text-2xl align-top sm:text-4xl">%</span>
          </span>
        </div>
        <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
