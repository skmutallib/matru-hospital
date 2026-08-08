"use client";

import { useEffect, useState } from "react";

const DURATION = 2000;

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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        "fixed inset-0 z-[100] flex flex-col justify-between",
        "transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform",
        exiting ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      style={{ backgroundColor: "#f5f2ec", color: "#16211d" }}
      aria-hidden={exiting}
    >
      {/* Top corner labels */}
      <div className="flex items-center justify-between px-8 pt-8 text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400 sm:px-12 sm:pt-10">
        <span>Mātru</span>
        <span>Est. 1985</span>
      </div>

      {/* Centered mark */}
      <div className="flex flex-1 items-center justify-center px-8">
        <img
          src="/matru-primarylogo.png"
          alt="Mātru Multispeciality Hospital"
          className="animate-hero-rise h-14 w-auto sm:h-20"
        />
      </div>

      {/* Baseline: label, counter, hairline rule */}
      <div className="px-8 pb-9 sm:px-12 sm:pb-12">
        <div className="flex items-end justify-between">
          <span className="pb-2 text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400 sm:pb-4">
            Loading
          </span>
          <span className="text-6xl font-light leading-none tabular-nums tracking-tight sm:text-8xl">
            {count}
            <span className="align-top text-xl text-neutral-400 sm:text-2xl">
              %
            </span>
          </span>
        </div>
        <div className="mt-6 h-px w-full overflow-hidden bg-neutral-300">
          <div
            className="h-full bg-[#16211d] transition-[width] duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
