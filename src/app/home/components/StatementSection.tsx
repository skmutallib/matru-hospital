"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FloatEl = {
  src: string;
  position: string; // absolute placement
  size: string; // width
  rot: number; // base tilt (deg)
  speed: number; // scroll-parallax drift (px) — negative = drifts up on scroll
};

// Scattered 3D medical elements — rise from the bottom, then float + drift up
// on scroll, like the Ekata coffee beans.
const ELEMENTS: FloatEl[] = [
  {
    src: "/elements/2.png", // stethoscope — top left
    position: "left-[1%] top-[8%]",
    size: "w-[14rem] lg:w-[18rem]",
    rot: -8,
    speed: -220,
  },
  {
    src: "/elements/3.png", // blood test tube — top center
    position: "left-[50%] top-[11%]",
    size: "w-[10rem] lg:w-[12.5rem]",
    rot: 8,
    speed: -320,
  },
  {
    src: "/elements/4.png", // pill & capsule — top right
    position: "right-[1%] top-[8%]",
    size: "w-[13rem] lg:w-[16rem]",
    rot: 6,
    speed: -270,
  },
  {
    src: "/elements/5.png", // winged caduceus — bottom left
    position: "bottom-[12%] left-[12%]",
    size: "w-[13rem] lg:w-[15rem]",
    rot: -6,
    speed: -180,
  },
  {
    src: "/elements/6.png", // hospital bed — bottom right
    position: "bottom-[11%] right-[4%]",
    size: "w-[17rem] lg:w-[20rem]",
    rot: 0,
    speed: -200,
  },
];

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const wraps = gsap.utils.toArray<HTMLElement>(".float-wrap");

      wraps.forEach((wrap, i) => {
        const img = wrap.querySelector<HTMLElement>(".float-el");
        if (!img) return;
        const rot = Number(img.dataset.rot) || 0;
        const speed = Number(wrap.dataset.speed) || 0;
        const dir = i % 2 === 0 ? 1 : -1;

        gsap.set(img, { rotation: rot, transformOrigin: "center center" });

        // Distance to push the element down to the section's bottom edge.
        const startY = Math.max(
          section.offsetHeight - wrap.offsetTop + 60,
          260
        );

        // Entrance: float up from the bottom into place when the section shows.
        gsap.from(img, {
          y: startY,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        // Idle float: gentle vertical bob + rotation wobble, forever.
        gsap.to(img, {
          yPercent: gsap.utils.random(-12, -6),
          rotation: rot + gsap.utils.random(3, 6) * dir,
          duration: gsap.utils.random(3, 4.6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.2 + gsap.utils.random(0, 1.2),
        });

        // Scroll parallax: the wrapper drifts up at its own speed for depth.
        gsap.to(wrap, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-[#0a0b0d] py-28 sm:py-36"
    >
      {/* Floating 3D medical elements */}
      <div
        className="pointer-events-none absolute inset-0 z-20 hidden select-none md:block"
        aria-hidden="true"
      >
        {ELEMENTS.map((el) => (
          <div
            key={el.src}
            data-speed={el.speed}
            className={`float-wrap absolute will-change-transform ${el.position}`}
          >
            <img
              src={el.src}
              alt=""
              data-rot={el.rot}
              className={`float-el drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] will-change-transform ${el.size}`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[110rem] flex-col items-center px-6 text-center">
        {/* Headline */}
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,9vw,9rem)] font-extrabold leading-[1.02] tracking-tight text-primary-500 drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
          <span className="block whitespace-nowrap">Lorem Ipsum Dolor</span>
          <span className="mt-1 block whitespace-nowrap">Sit Amet Consectetur</span>
        </h2>

        {/* Paragraph */}
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </section>
  );
}
