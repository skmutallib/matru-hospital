"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  target: number;
  thousands?: boolean;
  suffix: string;
  title: string;
  caption: string;
  filled: boolean;
  icon: React.ReactNode;
};

const IconFounded = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M5 3v18" />
    <path d="M5 4h11l-1.5 3L16 10H5" />
  </svg>
);

const IconBeds = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M3 8v11" />
    <path d="M3 14h18v5" />
    <path d="M21 14v-3a3 3 0 0 0-3-3h-7v6" />
    <circle cx="7" cy="11" r="1.6" />
  </svg>
);

const IconPatients = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M12 21s-7-4.4-9.3-9A5 5 0 0 1 12 5a5 5 0 0 1 9.3 7c-2.3 4.6-9.3 9-9.3 9z" />
  </svg>
);

const CARDS: Card[] = [
  {
    target: 1985,
    suffix: "",
    title: "Founded",
    caption: "By Dr. Krishna Rajendra",
    filled: false,
    icon: IconFounded,
  },
  {
    target: 100,
    suffix: "+",
    title: "Advanced Beds",
    caption: "Fully equipped, modern facility",
    filled: false,
    icon: IconBeds,
  },
  {
    target: 100000,
    thousands: true,
    suffix: "+",
    title: "Satisfied Patients",
    caption: "Trusted care since 1985",
    filled: true,
    icon: IconPatients,
  },
];

const CHAMFER_LEFT = {
  clipPath:
    "polygon(0 0, 100% 0, 100% 100%, 2.25rem 100%, 0 calc(100% - 2.25rem))",
};
const CHAMFER_RIGHT = {
  clipPath:
    "polygon(0 0, calc(100% - 2.25rem) 0, 100% 2.25rem, 100% 100%, 0 100%)",
};

type FloatIcon = {
  pos: React.CSSProperties; // absolute placement
  size: number; // px
  rot: number; // deg
  speed: number; // scroll drift in px
};

const ICONS: FloatIcon[] = [
  { pos: { top: "10%", left: "3%" }, size: 120, rot: -18, speed: 70 },
  { pos: { top: "14%", right: "5%" }, size: 150, rot: 22, speed: -90 },
  { pos: { top: "46%", left: "-1.5%" }, size: 92, rot: 14, speed: 55 },
  { pos: { bottom: "12%", right: "3%" }, size: 132, rot: -28, speed: -65 },
  { pos: { bottom: "16%", left: "5%" }, size: 96, rot: 36, speed: 80 },
  { pos: { top: "58%", right: "-1%" }, size: 78, rot: -12, speed: 40 },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>(".stat-num");

      const render = (n: HTMLElement, v: number) => {
        n.textContent =
          n.dataset.thousands === "true"
            ? `${Math.round(v / 1000)}K`
            : `${Math.round(v)}`;
      };

      const setFinal = () =>
        nums.forEach((n) => render(n, Number(n.dataset.target)));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setFinal();
        return;
      }

      // Cards stay static — only the numbers count up, slow & smooth.
      nums.forEach((n) => {
        const target = Number(n.dataset.target);
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: target,
          duration: 3,
          ease: "power4.out", // strong ease-out: eases gently into the final value
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onUpdate: () => render(n, proxy.v),
        });
      });

      // ---- Floating medicine icons ----
      // Entrance: float up from the bottom into place when the section appears.
      gsap.from(".med-icon", {
        yPercent: 160,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      // Idle float: gentle up/down bob, forever (varied per icon).
      gsap.utils.toArray<HTMLElement>(".med-float").forEach((f) => {
        gsap.to(f, {
          yPercent: gsap.utils.random(-16, -8),
          duration: gsap.utils.random(2.6, 4.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 1.4),
        });
      });

      // Scroll drift: each icon moves up/down with scroll at its own speed.
      gsap.utils.toArray<HTMLElement>(".med-parallax").forEach((p) => {
        gsap.to(p, {
          y: Number(p.dataset.speed),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-10 flex min-h-screen w-full items-center overflow-hidden rounded-t-[2.5rem] bg-[#0a0b0d] py-10 sm:-mt-20 sm:rounded-t-[5rem]"
    >
      {/* Floating medicine icons */}
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        {ICONS.map((icon, i) => (
          <div key={i} className="med-parallax absolute" style={{ ...icon.pos }} data-speed={icon.speed}>
            <div className="med-float">
              <img
                src="/medicine-icon.png"
                alt=""
                className="med-icon select-none drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
                style={{ width: icon.size, transform: `rotate(${icon.rot}deg)` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-4 sm:px-8">
        <div className="rounded-[2.5rem] bg-white/[0.04] p-8 ring-1 ring-white/10 sm:p-14 lg:p-16">
          {/* Top labels */}
          <div data-reveal className="flex items-center justify-between text-sm font-medium tracking-wide text-slate-500">
            <span>Mātru Hospital</span>
            <span className="hidden sm:inline">Our Impact</span>
            <span>02</span>
          </div>

          {/* Heading */}
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <h2 data-reveal className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Trusted care,
              <br />
              proven by numbers
            </h2>
            <p data-reveal className="max-w-sm text-base leading-relaxed text-slate-400 sm:pt-2 lg:text-lg">
              Decades of compassionate, preventive-focused treatment — measured
              by outcomes and the families we serve.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-3">
            {CARDS.map((card) => (
              <div
                key={card.title}
                data-reveal
                style={card.filled ? CHAMFER_RIGHT : CHAMFER_LEFT}
                className={[
                  "stat-card flex min-h-[20rem] flex-col p-8 sm:min-h-[24rem] sm:p-10",
                  card.filled
                    ? "bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 text-white shadow-[0_24px_50px_-18px_rgba(245,131,37,0.6)]"
                    : "bg-white/[0.04] text-white ring-1 ring-white/10",
                ].join(" ")}
              >
                {/* Icon chip */}
                <span
                  className={[
                    "flex h-14 w-14 items-center justify-center rounded-2xl",
                    card.filled
                      ? "bg-white/20 text-white"
                      : "bg-secondary-500/15 text-secondary-300",
                  ].join(" ")}
                >
                  {card.icon}
                </span>

                {/* Number + title */}
                <div className="mt-auto">
                  <div className="flex items-start">
                    <span
                      className={[
                        "stat-num text-7xl font-bold leading-none tracking-tight tabular-nums sm:text-8xl lg:text-8xl items-start",
                        card.filled ? "text-white" : "text-secondary-400",
                      ].join(" ")}
                      data-target={card.target}
                      data-thousands={card.thousands ? "true" : "false"}
                    >
                      0
                    </span>
                    {card.suffix && (
                      <span
                        className={[
                          "mt-2 text-3xl font-semibold sm:text-4xl lg:text-5xl",
                          card.filled ? "text-white/80" : "text-secondary-400",
                        ].join(" ")}
                      >
                        {card.suffix}
                      </span>
                    )}
                  </div>
                  <h3
                    className={[
                      "mt-3 text-2xl font-semibold sm:text-3xl",
                      card.filled ? "text-white" : "text-white",
                    ].join(" ")}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Caption */}
                <p
                  className={[
                    "ml-auto mt-6 max-w-[13rem] text-right text-sm leading-snug",
                    card.filled ? "text-white/80" : "text-slate-400",
                  ].join(" ")}
                >
                  {card.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
