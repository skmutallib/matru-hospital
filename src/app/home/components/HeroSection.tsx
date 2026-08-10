"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Hold the entrance animation until the preloader has slid away, so the
  // building actually rises from the bottom the first time it's seen.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const w = window as unknown as { __matruIntroReady?: boolean };

    if (w.__matruIntroReady) {
      // Defer out of the effect body to avoid a synchronous cascading render.
      const raf = requestAnimationFrame(() => setStarted(true));
      return () => cancelAnimationFrame(raf);
    }
    const onIntro = () => setStarted(true);
    window.addEventListener("matru:intro", onIntro);
    // Fallback in case the preloader isn't present on this render.
    const fallback = window.setTimeout(() => setStarted(true), 3500);
    return () => {
      window.removeEventListener("matru:intro", onIntro);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Keep the building hidden below the fold until the intro plays,
      // so it never flashes in place before the rise.
      gsap.set(".hero-building", { autoAlpha: 0, yPercent: 100 });
      gsap.set(".hero-building-shadow", { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax depth on scroll.
      tl.to(".hero-bg", { y: -30, scale: 1.06, ease: "none" }, 0);
      tl.to(".hero-eyebrow", { y: -70, opacity: 0, ease: "none" }, 0);
      tl.to(".hero-title", { y: -110, opacity: 0.1, ease: "none" }, 0);
      tl.to(".hero-sub", { y: -90, opacity: 0, ease: "none" }, 0);
      tl.to(".hero-building", { y: -12, ease: "none" }, 0);
      tl.to(".hero-foot", { y: 40, opacity: 0, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP intro: the building slides UP from below the fold (no fade),
  // revealed by the section's overflow-hidden — a clean premium rise.
  useEffect(() => {
    if (!started) return;
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".hero-building", { autoAlpha: 1, yPercent: 0, scale: 1 });
        gsap.set(".hero-building-shadow", { autoAlpha: 1, scaleX: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.set(".hero-building", {
        autoAlpha: 1,
        yPercent: 100,
        scale: 1.04,
        transformOrigin: "50% 100%",
      })
        .set(".hero-building-shadow", { autoAlpha: 0, scaleX: 0.5 })
        .to(".hero-building", {
          yPercent: 0,
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
        })
        .to(
          ".hero-building-shadow",
          { autoAlpha: 1, scaleX: 1, duration: 0.9, ease: "power2.out" },
          "-=0.75"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [started]);

  // Class helpers: hidden until the intro is allowed to run.
  const rise = (delay: string) =>
    started ? `animate-hero-rise ${delay}` : "opacity-0";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-start justify-center overflow-hidden bg-black"
    >
      {/* Full-width night skyline (backdrop) */}
      <img
        src="/hero-nightview.jpg"
        alt=""
        aria-hidden="true"
        className="hero-bg pointer-events-none absolute inset-0 h-full w-full origin-bottom object-cover object-bottom"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85"
        aria-hidden="true"
      />

      {/* Center spotlight lifting the building out of the scene */}
      <div
        className="pointer-events-none absolute left-1/2 top-[52%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/15 blur-[150px]"
        aria-hidden="true"
      />
      {/* Brand glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 z-0 h-[30rem] w-[30rem] rounded-full bg-primary-500/20 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/3 z-0 h-[28rem] w-[28rem] rounded-full bg-secondary-500/20 blur-[150px]"
        aria-hidden="true"
      />
      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      {/* ===== Headline (top-centered, kept clear of the building) ===== */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-24 text-center sm:pt-28">
        <span
          className={`hero-eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[20px] font-medium tracking-wide text-white backdrop-blur-md sm:text-sm ${rise(
            "[animation-delay:0.05s]"
          )}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400" />
          </span>
          Preventive-focused healthcare
          <span className="h-3.5 w-px bg-white/25" />
          <span className="text-white/70">Est. 1985</span>
        </span>

        <h1
          className={`hero-title mt-6 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl ${rise(
            "[animation-delay:0.15s]"
          )}`}
        >
          India&rsquo;s first{" "}
          <span className="bg-gradient-to-r from-white via-secondary-100 to-primary-200 bg-clip-text text-transparent">
            preventive-focused
          </span>{" "}
          hospital
        </h1>

        <p
          className={`hero-sub mt-4 max-w-md text-balance text-sm font-medium text-white/70 sm:text-base ${rise(
            "[animation-delay:0.28s]"
          )}`}
        >
          Where preventive meets cure — expert specialists and compassionate
          care, all under one roof.
        </p>
      </div>

      {/* ===== Hospital building — centered, rises from the bottom, nothing over it ===== */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
        aria-hidden="true"
      >
        <div className="relative flex w-[112%] max-w-[560px] origin-bottom items-end justify-center sm:w-[88%] sm:max-w-[660px] lg:max-w-[800px] xl:max-w-[1000px]">
          <div className="hero-building-shadow absolute bottom-0 left-1/2 h-16 w-[78%] -translate-x-1/2 translate-y-4 rounded-[100%] bg-black/80 blur-2xl" />
          <img
            src="/hero-hospitalBuilding.png"
            alt="Matru Multispeciality Hospital building at night"
            className="hero-building relative w-full origin-bottom object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Left-bottom legibility scrim */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[21] h-52 bg-gradient-to-t from-black via-black/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[21] h-72 w-[42rem] max-w-full [background:radial-gradient(60%_80%_at_0%_100%,rgba(0,0,0,0.85),transparent_70%)]"
        aria-hidden="true"
      />

      {/* ===== Bottom-left cluster: CTAs + trust tabs (no overlap with building) ===== */}
      <div
        className={`hero-foot absolute bottom-8 left-6 z-30 flex flex-col items-start gap-5 sm:left-10 lg:left-14 ${rise(
          "[animation-delay:0.5s]"
        )}`}
      >
        {/* Stats (no background) with count-up */}
        <div className="flex items-stretch divide-x divide-white/15">
          <Stat staticValue="24/7" label="Emergency Service" start={started} />
          <Stat to={80} suffix="+" label="Specialist doctors" start={started} />
          <Stat to={100} suffix="k+" label="Happy Patients" start={started} />
        </div>
      </div>
    </section>
  );
}

/* ---------- small presentational helpers ---------- */

function Stat({
  to,
  suffix = "",
  staticValue,
  label,
  start,
}: {
  to?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
  start: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start || to === undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setN(to));
      return () => cancelAnimationFrame(raf);
    }
    const duration = 1600;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);

  const display = staticValue ?? `${n}${suffix}`;

  return (
    <div className="flex flex-col items-center px-5 py-1 text-center first:pl-0 sm:px-7">
      <span className="text-2xl font-bold leading-none tracking-tight text-white tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-3xl">
        {display}
      </span>
      <span className="mt-1.5 text-[11px] font-medium text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:text-xs">
        {label}
      </span>
    </div>
  );
}
