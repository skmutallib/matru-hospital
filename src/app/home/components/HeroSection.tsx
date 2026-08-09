"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Shared scrubbed timeline tied to scrolling through the hero.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Each layer moves up a different amount => parallax depth.
      tl.to(".hero-grid", { y: -50, ease: "none" }, 0); // background: moves up a little (slow)
      tl.to(".hero-badge", { y: -60, opacity: 0, ease: "none" }, 0);
      tl.to(".hero-title", { y: -140, opacity: 0.25, ease: "none" }, 0); // text: faster
      tl.to(".hero-sub", { y: -180, opacity: 0, ease: "none" }, 0);
      tl.to(".hero-cta", { y: -220, opacity: 0, ease: "none" }, 0); // elements: fastest
      tl.to(".hero-scroll", { opacity: 0, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black"
    >
      {/* Brand glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-primary-500/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-secondary-500/20 blur-[140px]"
        aria-hidden="true"
      />

      {/* Subtle grid lines */}
      <div
        className="hero-grid pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-8">
        <span className="hero-badge animate-hero-rise inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-white backdrop-blur-md [animation-delay:0.05s]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Preventive-focused healthcare
        </span>

        <h1 className="hero-title animate-hero-rise mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white [animation-delay:0.15s] sm:text-6xl lg:text-7xl">
          India&rsquo;s first
          <br />
          <span className="bg-gradient-to-r from-white via-secondary-50 to-primary-100 bg-clip-text text-transparent">
            preventive-focused
          </span>{" "}
          hospital
        </h1>

        <p className="hero-sub animate-hero-rise mt-6 max-w-xl text-2xl font-semibold text-white/90 [animation-delay:0.28s] sm:text-3xl">
          Where preventive meets cure.
        </p>

        <div className="hero-cta animate-hero-rise mt-12 flex flex-col gap-4 [animation-delay:0.4s] sm:flex-row">
          <a
            href="#book-appointment"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-secondary-700 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
          >
            Book appointment
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
          </a>
          <a
            href="#brand-film"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/15"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
            </svg>
            Watch brand film
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <span className="animate-hero-scroll h-2 w-1 rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
}
