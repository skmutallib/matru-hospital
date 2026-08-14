"use client";

import { useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  StethoscopeIcon,
  HeartStraightIcon,
} from "@phosphor-icons/react/dist/ssr";

const LEGACY = [
  "Matru Multispeciality Hospital was founded in 1985 by Dr. Krishna Rajendra, whose mother's battle with cancer became the driving force behind his vision to create a hospital where quality, ethical, and compassionate healthcare is accessible to everyone.",
  "What began as a 25-bed nursing clinic has grown into a 100-bed multispeciality hospital, offering advanced infrastructure, modern technology, and comprehensive care across a wide range of specialties. While our capabilities have evolved, our commitment to patient-centred, evidence-based care remains unchanged.",
  "At Matru, we believe healthcare goes beyond treating illness. With clinical excellence, empathy, and a multidisciplinary approach, we are committed to supporting every patient through every stage of their healthcare journey.",
];

const STATS = [
  { value: "1985", label: "Founded" },
  { value: "100", label: "Beds" },
  { value: "25+", label: "Specialities" },
];

const MOTTO = [
  "At Matru Multispeciality Hospital, “Where Prevention Meets Cure” is more than our motto — it defines our approach to healthcare. We believe the best outcomes come from preventing illness, detecting conditions early, and delivering timely, tailored treatment when it matters most.",
  "From preventive screenings and advanced diagnostics to specialised treatments, rehabilitation, and follow-up care, we provide seamless, comprehensive healthcare under one roof. Backed by experienced specialists, modern technology, and evidence-based medicine, our focus is on helping every patient achieve better health at every stage of life.",
  "For us, healthcare is not just about treating disease — it's about building healthier lives through compassionate, patient-centred care that continues beyond recovery.",
];

// Icons paired 1:1 with MOTTO, echoing each pillar's theme (screening/early
// detection, clinical treatment, and long-term compassionate care).
const MOTTO_ICONS = [MagnifyingGlassIcon, StethoscopeIcon, HeartStraightIcon];

const CHAIRMAN =
  "Every brick of Matru has been laid with a vision of compassionate service and an unwavering commitment to patient care. Every patient treated and every surgery performed has brought us closer to our pursuit of clinical excellence. Our greatest achievement is not the institution we have built, but the trust we have earned. As Chairman, I pledge to uphold the values and principles that define Matru — with integrity, compassion, and innovation. Together, we will continue to save lives, advance the frontiers of medicine and serve with the same dedication that built this institution.";

// Placeholder leadership messages — professional filler copy (not literal
// Latin lorem ipsum) written in-voice, to be swapped for the real quotes.
const OTHERS = [
  {
    name: "Ms. Preeti Mahendra",
    role: "Chief Executive Officer",
    message:
      "At Matru, leadership means listening — to our patients, our clinicians, and the community we serve. Every process we refine and every service we introduce is measured against one question: does this make care simpler, safer, and more human? I'm proud of the team that shows up each day with that purpose, and committed to building an experience that earns trust at every visit.",
  },
  {
    name: "Mrs. Vijayalaxmi Mahendra",
    role: "Administrative Director",
    message:
      "Great healthcare is built on the details patients rarely see — the coordination, the readiness, the quiet discipline that keeps every department working as one. My focus has always been on strengthening that foundation, so that when someone walks through our doors, everything simply works, exactly when it matters most.",
  },
];

// Reuses phrases already stated elsewhere on the page — no new claims, just a
// decorative ticker.
const MARQUEE_ITEMS = [
  "EST. 1985",
  "100-BED HOSPITAL",
  "MULTISPECIALITY CARE",
  "WHERE PREVENTION MEETS CURE",
];

// Split a stat value like "25+" into an animatable number and its suffix, so
// the JSX always renders the exact original string (also the reduced-motion /
// no-JS fallback).
function parseStat(value: string) {
  const match = value.match(/^(\d+)(\D*)$/);
  return {
    target: match ? Number(match[1]) : 0,
    suffix: match ? match[2] : "",
    animatable: Boolean(match),
  };
}

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  const letters =
    words.length > 1
      ? words[words.length - 2][0] + words[words.length - 1][0]
      : words[0]?.[0] ?? "";
  return letters.toUpperCase();
}

function SectionRule({ index, label }: { index: string; label: string }) {
  return (
    <div className="reveal-el flex items-center gap-5">
      <span className="font-[family-name:var(--font-display)] text-3xl font-bold leading-none text-primary-500 sm:text-4xl">
        {index}
      </span>
      <span className="h-px flex-1 max-w-[3.5rem] bg-gradient-to-r from-primary-500/70 to-transparent" />
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/** Oversized outlined numeral, sitting behind a section's content as ambient
 *  editorial typography. Purely decorative — echoes the section's own index. */
function GhostNumber({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="ghost-num pointer-events-none absolute -top-6 left-1/2 z-0 -translate-x-1/2 select-none text-[8rem] leading-none sm:-top-10 sm:text-[12rem] lg:text-[15rem]"
    >
      {children}
    </span>
  );
}

/** A masked, line-by-line rising heading. Each line clips inside its row and
 *  slides up when the wrapping element gains `.is-in`. */
function MaskLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden py-[0.05em]">
      <span className="mask-ln block" style={{ transitionDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

/** Looping ticker row — content is duplicated so translating by -50% loops
 *  seamlessly. Decorative only, so it's hidden from assistive tech. */
function Marquee({
  items,
  className,
}: {
  items: string[];
  className: string;
}) {
  return (
    <div className="marquee-track" aria-hidden="true">
      {[...items, ...items].map((item, i) => (
        <span key={i} className={className}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function AboutContent() {
  const root = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // rAF count-up that lands on the exact original value.
    const runCount = (node: HTMLElement) => {
      if (node.dataset.counted) return;
      node.dataset.counted = "1";
      const target = Number(node.dataset.value || "0");
      const suffix = node.dataset.suffix || "";
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
    };

    const reveal = (node: HTMLElement) => {
      node.classList.add("is-in");
      node.querySelectorAll<HTMLElement>(".js-count").forEach(runCount);
    };

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>(".reveal-el, .mask-wrap")
    );

    // Reveal anything already in view on mount (hero, and on tall viewports the
    // first section) without waiting for a scroll.
    const vh = window.innerHeight;
    targets.forEach((node) => {
      if (node.getBoundingClientRect().top < vh * 0.9) reveal(node);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((node) => {
      if (!node.classList.contains("is-in")) io.observe(node);
    });

    // Reading-progress rail — tracks scroll position across the About page.
    const bar = progressRef.current;
    let ticking = false;
    const updateProgress = () => {
      ticking = false;
      if (!bar) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Pointer-only flourishes: a cursor-reactive hero glow and a gentle
    // magnetic tilt on cards. Skipped on touch devices.
    let cleanupPointer = () => {};
    if (window.matchMedia("(pointer: fine)").matches) {
      const heroZone = el.querySelector<HTMLElement>(".hero-spot-zone");
      const spotlight = el.querySelector<HTMLElement>(".hero-spotlight");
      const onHeroMove = (e: MouseEvent) => {
        if (!heroZone || !spotlight) return;
        const r = heroZone.getBoundingClientRect();
        spotlight.style.setProperty(
          "--sx",
          `${((e.clientX - r.left) / r.width) * 100}%`
        );
        spotlight.style.setProperty(
          "--sy",
          `${((e.clientY - r.top) / r.height) * 100}%`
        );
      };
      heroZone?.addEventListener("mousemove", onHeroMove);

      const tiltCards = Array.from(
        el.querySelectorAll<HTMLElement>(".tilt-card")
      );
      const onTiltMove = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(
          2
        )}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`;
      };
      const onTiltLeave = (e: MouseEvent) => {
        (e.currentTarget as HTMLElement).style.transform = "";
      };
      tiltCards.forEach((c) => {
        c.addEventListener("mousemove", onTiltMove);
        c.addEventListener("mouseleave", onTiltLeave);
      });

      cleanupPointer = () => {
        heroZone?.removeEventListener("mousemove", onHeroMove);
        tiltCards.forEach((c) => {
          c.removeEventListener("mousemove", onTiltMove);
          c.removeEventListener("mouseleave", onTiltLeave);
        });
      };
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanupPointer();
    };
  }, []);

  return (
    <div ref={root} className="about-scope relative overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .about-scope .reveal-el {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-scope .reveal-el.is-in {
          opacity: 1;
          transform: none;
        }
        .about-scope .mask-ln {
          transform: translateY(115%);
          transition: transform 1.05s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-scope .mask-wrap.is-in .mask-ln {
          transform: none;
        }
        .about-scope .marquee-track {
          display: flex;
          width: max-content;
          animation: about-marquee 26s linear infinite;
        }
        .about-scope .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes about-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .about-scope .reveal-line {
          transform: scaleX(0);
          transform-origin: 0% 50%;
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
        }
        .about-scope .reveal-el.is-in .reveal-line {
          transform: scaleX(1);
        }
        .about-scope .ghost-num {
          font-family: var(--font-display);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.07);
        }
        .about-scope .progress-fill {
          transform: scaleX(0);
          transform-origin: 0% 0%;
          transition: transform 0.12s linear;
        }
        @property --ring-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        .about-scope .leader-ring {
          background: conic-gradient(
            from var(--ring-angle),
            var(--color-primary-500) 0deg,
            var(--color-secondary-400) 120deg,
            transparent 200deg,
            var(--color-primary-400) 280deg,
            var(--color-primary-500) 360deg
          );
          animation: about-ring-spin 5s linear infinite;
        }
        @keyframes about-ring-spin {
          to { --ring-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-scope .reveal-el,
          .about-scope .mask-ln,
          .about-scope .reveal-line {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .about-scope .marquee-track,
          .about-scope .leader-ring {
            animation: none !important;
          }
        }
      `}</style>

      {/* Reading-progress rail */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-white/[0.07]"
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="progress-fill h-full bg-gradient-to-r from-primary-500 to-secondary-500"
        />
      </div>

      {/* ===== Hero ===== */}
      <section className="hero-spot-zone relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-24 pt-40 sm:px-10 lg:px-16">
        {/* Ambient glows */}
        <div
          className="animate-hero-float pointer-events-none absolute -right-32 top-24 -z-0 h-[34rem] w-[34rem] rounded-full bg-primary-500/12 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 bottom-0 -z-0 h-[30rem] w-[30rem] rounded-full bg-secondary-500/10 blur-[160px]"
          aria-hidden="true"
        />
        {/* Cursor-reactive spotlight */}
        <div
          className="hero-spotlight pointer-events-none absolute inset-0 -z-0 transition-opacity duration-500"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(560px circle at var(--sx, 65%) var(--sy, 25%), rgba(245,131,37,0.14), transparent 62%)",
          }}
        />
        {/* Fine grid, faded toward the edges */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 opacity-[0.5]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 65% at 50% 45%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 50% 45%, #000 40%, transparent 100%)",
          }}
        />
        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <span className="reveal-el inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            About Mātru
          </span>

          <h1 className="mask-wrap mt-10 font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">
            <MaskLine>Rooted in legacy,</MaskLine>
            <MaskLine delay={0.12}>
              <span className="text-primary-500">built for healing.</span>
            </MaskLine>
          </h1>

          <div className="reveal-el mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/12 pt-8 text-sm uppercase tracking-[0.15em] text-slate-400">
            <span>Est. 1985</span>
            <span className="h-1 w-1 rounded-full bg-primary-500" />
            <span>100-Bed Hospital</span>
            <span className="h-1 w-1 rounded-full bg-primary-500" />
            <span>Multispeciality Care</span>
          </div>
        </div>

        {/* Full-bleed ticker ribbon */}
        <div className="reveal-el relative z-10 -mx-6 mt-16 overflow-hidden border-y border-white/10 py-4 sm:-mx-10 lg:-mx-16">
          <Marquee
            items={MARQUEE_ITEMS}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 after:ml-8 after:h-1 after:w-1 after:rounded-full after:bg-primary-500/60 after:content-['']"
          />
        </div>

        {/* Scroll cue */}
        <div
          className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <span className="animate-hero-scroll h-1.5 w-1.5 rounded-full bg-primary-400" />
          </span>
        </div>
      </section>

      {/* ===== 01 · Legacy ===== */}
      <section className="relative w-full px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
        <GhostNumber>01</GhostNumber>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <SectionRule index="01" label="Our Legacy" />

          <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="mask-wrap font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                <MaskLine>Four decades of</MaskLine>
                <MaskLine delay={0.12}>
                  <span className="text-primary-500">trust &amp; care.</span>
                </MaskLine>
              </h2>
              <div className="reveal-el mt-8 hidden h-px w-24 bg-gradient-to-r from-primary-500 to-transparent lg:block" />
            </div>

            <div className="space-y-8">
              {LEGACY.map((p, i) => (
                <p
                  key={i}
                  className={`reveal-el leading-relaxed text-slate-400 ${
                    i === 0
                      ? "border-l-2 border-primary-500/60 pl-6 text-xl text-slate-200 sm:text-2xl"
                      : "text-lg sm:text-xl"
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Stats — premium cards */}
          <div className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {STATS.map((s) => {
              const { target, suffix, animatable } = parseStat(s.value);
              return (
                <div key={s.label} className="reveal-el">
                  <div className="tilt-card group relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] p-8 transition-[background-color,border-color,box-shadow] duration-500 will-change-transform hover:border-primary-500/40 hover:bg-white/[0.04] hover:shadow-[0_24px_70px_-30px_rgba(245,131,37,0.3)] sm:p-10">
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div className="font-[family-name:var(--font-display)] text-6xl font-bold tracking-tight text-primary-500 sm:text-7xl">
                        {animatable ? (
                          <span
                            className="js-count"
                            data-value={target}
                            data-suffix={suffix}
                          >
                            {s.value}
                          </span>
                        ) : (
                          s.value
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-400">
                        <span className="h-px w-6 bg-primary-500/60" />
                        {s.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth line — 1985 founding to today, drawn in on reveal */}
          <div className="reveal-el mt-14 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              1985 · Founded
            </span>
            <span className="relative h-px w-full flex-1 overflow-hidden bg-white/10">
              <span className="reveal-line absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />
            </span>
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Today · 100-Bed Hospital
            </span>
          </div>
        </div>
      </section>

      {/* ===== 02 · Motto ===== */}
      <section className="relative w-full overflow-hidden border-t border-white/10 bg-white/[0.015] px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
        <GhostNumber>02</GhostNumber>
        <div
          className="pointer-events-none absolute right-1/4 top-1/3 -z-0 h-[26rem] w-[26rem] rounded-full bg-secondary-500/8 blur-[150px]"
          aria-hidden="true"
        />
        {/* Kinetic watermark, echoing the motto itself */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 overflow-hidden opacity-[0.05]"
          aria-hidden="true"
        >
          <Marquee
            items={["PREVENTION", "PREVENTION", "PREVENTION"]}
            className="whitespace-nowrap px-8 font-[family-name:var(--font-display)] text-[10rem] font-extrabold leading-none text-white sm:text-[14rem]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <SectionRule index="02" label="Our Motto" />

          <h2 className="mask-wrap mt-16 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
            <MaskLine>Where prevention</MaskLine>
            <MaskLine delay={0.12}>
              <span className="text-primary-500">meets cure.</span>
            </MaskLine>
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.04] md:grid-cols-3">
            {MOTTO.map((p, i) => {
              const Icon = MOTTO_ICONS[i];
              return (
                <div key={i} className="reveal-el">
                  <div className="tilt-card group relative h-full bg-[#0a0b0d] p-8 transition-colors duration-500 will-change-transform hover:bg-white/[0.03] sm:p-10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-primary-400 transition-colors duration-500 group-hover:border-primary-500/40">
                        <Icon size={18} weight="duotone" />
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-lg font-bold text-primary-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      className="mt-6 block h-px w-full bg-white/10 transition-colors duration-500 group-hover:bg-primary-500/40"
                      aria-hidden="true"
                    />
                    <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
                      {p}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 03 · Leadership ===== */}
      <section className="relative w-full border-t border-white/10 px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
        <GhostNumber>03</GhostNumber>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <SectionRule index="03" label="Voices of Mātru" />

          {/* Chairman */}
          <figure className="mt-16 grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:gap-24">
            <figcaption className="lg:sticky lg:top-32 lg:self-start">
              <div className="reveal-el relative flex h-24 w-24 items-center justify-center">
                <span
                  className="leader-ring absolute inset-0 rounded-full p-[2px]"
                  aria-hidden="true"
                >
                  <span className="block h-full w-full rounded-full bg-[#0a0b0d]" />
                </span>
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-[family-name:var(--font-display)] text-xl font-bold text-white shadow-lg shadow-primary-500/30">
                  MS
                </span>
              </div>
              <p className="reveal-el mt-6 text-xl font-semibold text-white">
                Dr. Mahendra SK
              </p>
              <p className="reveal-el text-sm uppercase tracking-[0.15em] text-primary-400">
                Chairman &amp; Chief Orthopaedic Surgeon
              </p>
            </figcaption>

            <blockquote
              className="reveal-el relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 p-8 text-2xl font-medium leading-[1.5] tracking-tight text-slate-200 sm:p-12 sm:text-[2rem] sm:leading-[1.45]"
              style={{
                backgroundImage:
                  "radial-gradient(120% 140% at 10% -10%, rgba(245,131,37,0.08), transparent 55%)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                className="pointer-events-none absolute -left-1 -top-8 font-[family-name:var(--font-display)] text-[9rem] leading-none text-primary-500/15"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <span
                className="pointer-events-none absolute -bottom-16 -right-1 rotate-180 font-[family-name:var(--font-display)] text-[9rem] leading-none text-primary-500/10"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <span className="relative">{CHAIRMAN}</span>
            </blockquote>
          </figure>

          {/* CEO + Admin — same figure treatment as the Chairman above */}
          <div className="mt-24 space-y-20 border-t border-white/10 pt-24">
            {OTHERS.map((m) => (
              <figure
                key={m.name}
                className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:gap-24"
              >
                <figcaption className="lg:sticky lg:top-32 lg:self-start">
                  <div className="reveal-el relative flex h-24 w-24 items-center justify-center">
                    <span
                      className="leader-ring absolute inset-0 rounded-full p-[2px]"
                      aria-hidden="true"
                    >
                      <span className="block h-full w-full rounded-full bg-[#0a0b0d]" />
                    </span>
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-[family-name:var(--font-display)] text-xl font-bold text-white shadow-lg shadow-primary-500/30">
                      {monogram(m.name)}
                    </span>
                  </div>
                  <p className="reveal-el mt-6 text-xl font-semibold text-white">
                    {m.name}
                  </p>
                  <p className="reveal-el text-sm uppercase tracking-[0.15em] text-primary-400">
                    {m.role}
                  </p>
                </figcaption>

                <blockquote
                  className="reveal-el relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 p-8 text-2xl font-medium leading-[1.5] tracking-tight text-slate-200 sm:p-12 sm:text-[2rem] sm:leading-[1.45]"
                  style={{
                    backgroundImage:
                      "radial-gradient(120% 140% at 10% -10%, rgba(245,131,37,0.08), transparent 55%)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span
                    className="pointer-events-none absolute -left-1 -top-8 font-[family-name:var(--font-display)] text-[9rem] leading-none text-primary-500/15"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <span
                    className="pointer-events-none absolute -bottom-16 -right-1 rotate-180 font-[family-name:var(--font-display)] text-[9rem] leading-none text-primary-500/10"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <span className="relative">{m.message}</span>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
