"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide reveal-on-scroll (PRYPCO-style): any element marked with
 * `data-reveal` rises up + fades in as it enters the viewport, and
 * resets when scrolled back above, so it re-plays on the way back down.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: 48 });

    const batch = ScrollTrigger.batch("[data-reveal]", {
      start: "top 86%",
      onEnter: (b) =>
        gsap.to(b, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true,
        }),
      onLeaveBack: (b) =>
        gsap.to(b, { opacity: 0, y: 48, duration: 0.4, overwrite: true }),
    });

    // Recalculate once the preloader releases the scroll lock.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refresh);
      batch.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
