"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps sections that should share one continuous background which
 * smoothly turns black as the founder message (".message-anchor") approaches,
 * so the previous section darkens along with it.
 */
export default function DarkZone({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anchor = el.querySelector<HTMLElement>(".message-anchor");
    if (!anchor) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const faqAnchor = el.querySelector<HTMLElement>(".faq-anchor");

    const ctx = gsap.context(() => {
      // Light -> dark as the founder message approaches.
      gsap.fromTo(
        el,
        { backgroundColor: "#ffffff" },
        {
          backgroundColor: "#0a0a0a",
          ease: "none",
          scrollTrigger: {
            trigger: anchor,
            start: "top 92%", // begin darkening while the previous section is still visible
            end: "top 35%",
            scrub: 1, // slight smoothing lag for a premium feel
          },
        }
      );

      // Dark -> light again as the FAQ enters (automatic return to light theme).
      if (faqAnchor) {
        gsap.fromTo(
          el,
          { backgroundColor: "#0a0a0a" },
          {
            backgroundColor: "#f1f1f4",
            ease: "none",
            immediateRender: false, // don't override the initial white on load
            scrollTrigger: {
              trigger: faqAnchor,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref} className="bg-white">{children}</div>;
}
