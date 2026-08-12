"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Repeat the single logo 25 times for now — swap these paths as real logos
// come in. Each entry is just an image src.
const LOGOS: string[] = Array.from(
  { length: 25 },
  () => "/insurance/bajaj-allianz.png"
);

export default function InsuranceSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const track2 = track2Ref.current;
    if (!track || !track2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Each track holds two identical halves for a seamless loop.
      // Row 1 drifts left → right, row 2 drifts right → left.
      gsap.fromTo(
        track,
        { xPercent: -50 },
        { xPercent: 0, duration: 60, ease: "none", repeat: -1 }
      );
      gsap.to(track2, {
        xPercent: -50,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, []);

  // A single group of logo cards; rendered twice for a seamless loop.
  const group = (
    <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden="true">
      {LOGOS.map((src, i) => (
        <div
          key={i}
          className="flex h-16 shrink-0 items-center justify-center"
        >
          <img
            src={src}
            alt=""
            className="h-7 w-auto object-contain sm:h-9"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-[#0a0b0d] py-20 sm:py-28">
      {/* Heading */}
      <div className="mx-auto mb-14 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-300">
          Cashless Insurance
        </span>
        <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Insurance Partners We Accept
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 lg:text-lg">
          Enjoy hassle-free, cashless treatment with 25+ leading insurance
          providers — so you can focus on recovery, not paperwork.
        </p>
      </div>

      {/* Marquee — two rows drifting in opposite directions */}
      <div className="relative w-full">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0b0d] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0b0d] to-transparent sm:w-40" />

        <div className="flex flex-col gap-10">
          <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
            {group}
            {group}
          </div>
          <div ref={track2Ref} className="flex w-max flex-nowrap will-change-transform">
            {group}
            {group}
          </div>
        </div>
      </div>
    </section>
  );
}
