"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTE =
  "We built Mātru on a simple belief — that prevention is trust form of cure. Our mission is to bring compassionate, world-class care to every family, and to catch illness before it begins — no matter their background or circumstance.";

export default function MessageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const words = gsap.utils.toArray<HTMLElement>(".reveal-word");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Quote fills word-by-word (dim -> bright) — smooth, premium wave.
      // scrub:1 adds a gentle lag so the fill glides rather than snaps.
      gsap.set(words, { opacity: 0.12 });
      gsap.to(words, {
        opacity: 1,
        ease: "power1.out",
        stagger: { each: 0.5, ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top 68%",
          end: "bottom 92%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="message-anchor flex min-h-screen w-full items-center bg-transparent py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[95rem] px-6 sm:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Left label */}
          <div className="lg:w-1/6">
            <p data-reveal className="text-lg font-bold text-neutral-400">
              A message from our founder
            </p>
          </div>

          {/* Quote + author */}
          <div className="lg:w-5/6">
            <blockquote className="text-4xl font-medium leading-[1.22] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="reveal-word">“</span>
              {QUOTE.split(" ").map((word, i) => (
                <span key={i} className="reveal-word">
                  {word}{" "}
                </span>
              ))}
              <span className="reveal-word">”</span>
            </blockquote>

            {/* Author */}
            <div data-reveal className="mt-14 flex items-center gap-6">
              {/* Demo portrait */}
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 sm:h-36 sm:w-32">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/90">
                  KR
                </span>
                <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-white/60">
                  Demo photo
                </span>
              </div>

              <div>
                <p className="text-xl font-bold text-primary-400">
                  Dr. Krishna Rajendra
                </p>
                <p className="mt-1 text-base text-neutral-400">
                  Founder | Internal Medicine
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
