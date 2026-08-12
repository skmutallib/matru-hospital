"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Gate the entrance animation to the first client frame so the building
  // actually rises from the bottom the first time it's seen.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Start the entrance animation as soon as the hero mounts.
    // Deferred out of the effect body to avoid a synchronous cascading render.
    const raf = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(raf);
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
      {/* Premium black backdrop */}
      <div
        className="hero-bg pointer-events-none absolute inset-0 h-full w-full origin-bottom bg-[radial-gradient(120%_90%_at_50%_0%,#141414_0%,#0a0a0a_45%,#000000_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"
        aria-hidden="true"
      />

      {/* Center spotlight lifting the building out of the scene */}
      <div
        className="pointer-events-none absolute left-1/2 top-[52%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/15 blur-[150px]"
        aria-hidden="true"
      />
      {/* ===== Hospital building — centered, rises from the bottom, nothing over it ===== */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
        aria-hidden="true"
      >
        <div className="relative flex w-[140%] max-w-[810px] origin-bottom items-end justify-center sm:w-[107%] sm:max-w-[970px] lg:max-w-[1180px] xl:max-w-[1440px]">
          <div className="hero-building-shadow absolute bottom-0 left-1/2 h-16 w-[78%] -translate-x-1/2 translate-y-4 rounded-[100%] bg-black/80 blur-2xl" />
          <img
            src="/hero-dayview-building.png"
            alt="Matru Multispeciality Hospital building"
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

      {/* ===== Headline — sits below the building, near the stairs ===== */}
      <div
        className={`absolute inset-x-0 bottom-8 z-30 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center sm:bottom-10 ${rise(
          "[animation-delay:0.15s]"
        )}`}
      >
        <h1 className="hero-title whitespace-nowrap text-2xl font-bold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] sm:text-4xl lg:text-5xl">
          India&rsquo;s first{" "}
          <span className="bg-gradient-to-r from-white via-secondary-100 to-primary-200 bg-clip-text text-transparent">
            preventive-focused
          </span>{" "}
          hospital
        </h1>
        <p className="hero-sub mt-3 max-w-md text-balance text-sm font-medium text-white/70 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)] sm:text-base">
          Where preventive meets cure — expert specialists and compassionate
          care, all under one roof.
        </p>
      </div>

    </section>
  );
}
