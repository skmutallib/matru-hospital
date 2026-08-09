"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PHRASE = "Where Prevention Meets Cure";
const SEPARATOR = "•";

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // The track holds two identical halves; shift by 50% and loop seamlessly.
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 28, // slow
        ease: "none",
        repeat: -1,
      });

      return () => tween.kill();
    }, track);

    return () => ctx.revert();
  }, []);

  // Two identical groups back-to-back for a seamless loop.
  const group = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8 text-6xl font-bold tracking-tight text-white sm:px-12 sm:text-8xl lg:text-[17rem]">
            {PHRASE}
          </span>
          <span className="px-2 text-4xl text-primary-500 sm:text-6xl">
            {SEPARATOR}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-[#0a0b0d] py-16 sm:py-24">
      <span className="sr-only">{PHRASE}</span>
      <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
        {group}
        {group}
      </div>
    </section>
  );
}
