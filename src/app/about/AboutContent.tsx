"use client";

import { useEffect, useRef } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  MagnifyingGlassIcon,
  StethoscopeIcon,
  HeartStraightIcon,
  ArrowUpRightIcon,
  PlantIcon,
  BuildingsIcon,
  PulseIcon,
  StarFourIcon,
} from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ content */

// Mission statement — illuminated word-by-word on scroll. Keywords carry the
// brand accent. Kept concise so the pinned reveal reads in one deliberate beat.
const STATEMENT =
  "For four decades, Mātru has believed that healthcare goes beyond treating illness — it is the art of *prevention*, the science of *cure*, and the *compassion* that carries every patient safely home.";

type Milestone = {
  tag: string;
  title: string;
  body: string;
  Icon: Icon;
};

const TIMELINE: Milestone[] = [
  {
    tag: "1985",
    title: "The Beginning",
    body: "Founded by Dr. Krishna Rajendra — born from his mother's battle with cancer, and a vision of quality, ethical, compassionate care accessible to everyone.",
    Icon: PlantIcon,
  },
  {
    tag: "25 Beds",
    title: "Humble Roots",
    body: "What began as a modest 25-bed nursing clinic, built on compassion, clinical discipline, and an unwavering commitment to the people it served.",
    Icon: HeartStraightIcon,
  },
  {
    tag: "Evolution",
    title: "Advancing Care",
    body: "Advanced infrastructure, modern technology, and comprehensive care across a growing range of specialities — capabilities evolving, values unchanged.",
    Icon: PulseIcon,
  },
  {
    tag: "100 Beds",
    title: "Today",
    body: "A 100-bed multispeciality hospital with 25+ specialities, delivering seamless, patient-centred care under one roof — where prevention meets cure.",
    Icon: BuildingsIcon,
  },
  {
    tag: "Tomorrow",
    title: "The Promise",
    body: "An enduring commitment to patient-centred, evidence-based care — supporting every patient through every stage of their healthcare journey.",
    Icon: StarFourIcon,
  },
];

const STATS = [
  { value: "1985", label: "Founded" },
  { value: "100", label: "Beds" },
  { value: "25+", label: "Specialities" },
];

const MOTTO: { heading: string; body: string; Icon: Icon }[] = [
  {
    heading: "Prevention First",
    Icon: MagnifyingGlassIcon,
    body: "The best outcomes come from preventing illness, detecting conditions early, and delivering timely, tailored treatment when it matters most.",
  },
  {
    heading: "Comprehensive Care",
    Icon: StethoscopeIcon,
    body: "From preventive screenings and advanced diagnostics to specialised treatments, rehabilitation, and follow-up — seamless healthcare under one roof.",
  },
  {
    heading: "Beyond Recovery",
    Icon: HeartStraightIcon,
    body: "Healthcare isn't just about treating disease — it's about building healthier lives through compassionate care that continues beyond recovery.",
  },
];

const CHAIRMAN = {
  name: "Dr. Mahendra SK",
  role: "Chairman & Chief Orthopaedic Surgeon",
  message:
    "Every brick of Matru has been laid with a vision of compassionate service and an unwavering commitment to patient care. Our greatest achievement is not the institution we have built, but the trust we have earned. As Chairman, I pledge to uphold the values that define Matru — with integrity, compassion, and innovation. Together, we will continue to save lives and advance the frontiers of medicine.",
};

const OTHERS = [
  {
    name: "Ms. Preeti Mahendra",
    role: "Chief Executive Officer",
    message:
      "Leadership means listening — to our patients, our clinicians, and the community we serve. Every service we introduce is measured against one question: does this make care simpler, safer, and more human?",
  },
  {
    name: "Mrs. Vijayalaxmi Mahendra",
    role: "Administrative Director",
    message:
      "Great healthcare is built on the details patients rarely see — the coordination, the readiness, the quiet discipline that keeps every department working as one, exactly when it matters most.",
  },
];

/* ------------------------------------------------------------------ helpers */

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

// Render the statement as per-word spans; words wrapped in *asterisks* get the
// brand accent. Every word is a `.stmt-word` for the scroll illumination.
function StatementWords() {
  return (
    <>
      {STATEMENT.split(" ").map((raw, i) => {
        // Words wrapped in *asterisks* (punctuation may trail) get the accent.
        const accent = raw.includes("*");
        const word = raw.replace(/\*/g, "");
        return (
          <span
            key={i}
            className={`stmt-word inline-block ${accent ? "text-primary-500" : ""}`}
          >
            {word}
            {" "}
          </span>
        );
      })}
    </>
  );
}

/* ----------------------------------------------------------------- component */

export default function AboutContent() {
  const root = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Count-up that lands on the exact original value.
    const runCount = (node: HTMLElement) => {
      if (node.dataset.counted) return;
      node.dataset.counted = "1";
      const target = Number(node.dataset.value || "0");
      const suffix = node.dataset.suffix || "";
      const start = performance.now();
      const dur = 1700;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
    };

    if (reduce) {
      // Static, fully-legible fallback.
      el.querySelectorAll<HTMLElement>(".stmt-word").forEach(
        (n) => (n.style.opacity = "1")
      );
      el.querySelectorAll<HTMLElement>(".js-count").forEach(runCount);
      return;
    }

    const ctx = gsap.context(() => {
      /* Hero — headline mask reveal on load */
      gsap.set(".hero-line", { yPercent: 120 });
      gsap.to(".hero-line", {
        yPercent: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
      });

      /* Hero — parallax on scroll */
      gsap.to(".hero-content", {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-watermark", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Generic reveal-up */
      gsap.set(".lux-up", { opacity: 0, y: 46 });
      ScrollTrigger.batch(".lux-up", {
        start: "top 86%",
        onEnter: (b) =>
          gsap.to(b, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });

      /* Mission statement — pinned, word-by-word illumination */
      gsap.set(".stmt-word", { opacity: 0.16 });
      const stmtTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".stmt-section",
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      stmtTl.to(".stmt-word", { opacity: 1, ease: "none", stagger: 0.4 });

      /* Legacy — pinned horizontal timeline */
      const track = trackRef.current;
      if (track) {
        const getScroll = () => track.scrollWidth - window.innerWidth;
        const tlTween = gsap.to(track, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-section",
            start: "top top",
            end: () => `+=${getScroll()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        // Each panel's inner content eases up as it crosses the viewport,
        // driven by the horizontal track motion (containerAnimation).
        gsap.utils.toArray<HTMLElement>(".tl-panel-inner").forEach((inner) => {
          gsap.fromTo(
            inner,
            { y: 48, opacity: 0.3 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: inner,
                containerAnimation: tlTween,
                start: "left 88%",
                end: "left 52%",
                scrub: true,
              },
            }
          );
        });
      }

      /* Stats — count-up on enter */
      ScrollTrigger.create({
        trigger: ".stats-band",
        start: "top 80%",
        once: true,
        onEnter: () =>
          el.querySelectorAll<HTMLElement>(".js-count").forEach(runCount),
      });

      /* Reading-progress rail */
      const bar = progressRef.current;
      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      /* Cursor-reactive hero glow (desktop only) */
      if (window.matchMedia("(pointer: fine)").matches) {
        const zone = el.querySelector<HTMLElement>(".hero-section");
        const spot = el.querySelector<HTMLElement>(".hero-spotlight");
        const onMove = (e: MouseEvent) => {
          if (!zone || !spot) return;
          const r = zone.getBoundingClientRect();
          spot.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
          spot.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
        };
        zone?.addEventListener("mousemove", onMove);
        return () => zone?.removeEventListener("mousemove", onMove);
      }
    }, el);

    // Settle after fonts / preloader release.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="about-scope relative overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .about-scope .progress-fill { transform: scaleX(0); transform-origin: 0 0; }
        @property --lux-ring { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        .about-scope .leader-ring {
          background: conic-gradient(from var(--lux-ring),
            var(--color-primary-500) 0deg, var(--color-secondary-400) 120deg,
            transparent 200deg, var(--color-primary-400) 280deg, var(--color-primary-500) 360deg);
          animation: lux-ring-spin 5s linear infinite;
        }
        @keyframes lux-ring-spin { to { --lux-ring: 360deg; } }
        .about-scope .marquee-track {
          display: flex; width: max-content; animation: about-marquee 30s linear infinite;
        }
        @keyframes about-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .about-scope .leader-ring, .about-scope .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Reading-progress rail */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-white/[0.06]"
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="progress-fill h-full bg-gradient-to-r from-primary-500 to-secondary-500"
        />
      </div>

      {/* ============================================================ HERO */}
      <section className="hero-section relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-24 pt-40 sm:px-10 lg:px-16">
        <div
          className="animate-hero-float pointer-events-none absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-primary-500/14 blur-[170px]"
          aria-hidden="true"
        />
        <div
          className="animate-hero-float pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-secondary-500/12 blur-[160px]"
          aria-hidden="true"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="hero-spotlight pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(600px circle at var(--sx,70%) var(--sy,20%), rgba(245,131,37,0.12), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          }}
        />
        {/* Giant parallax watermark */}
        <div
          className="hero-watermark pointer-events-none absolute inset-x-0 top-[38%] z-0 flex justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="select-none font-[family-name:var(--font-display)] text-[28vw] font-extrabold leading-none text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.045)" }}
          >
            MĀTRU
          </span>
        </div>

        <div className="hero-content relative z-10 mx-auto w-full max-w-7xl">
          <span className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            About Mātru · Est. 1985
          </span>

          <h1 className="mt-10 font-[family-name:var(--font-display)] text-6xl font-extrabold leading-[0.92] tracking-tight text-white sm:text-8xl lg:text-[8.5rem]">
            <span className="block overflow-hidden py-[0.04em]">
              <span className="hero-line block">Rooted in legacy,</span>
            </span>
            <span className="block overflow-hidden py-[0.04em]">
              <span className="hero-line block text-primary-500">built for healing.</span>
            </span>
          </h1>

          <p className="hero-fade mt-10 max-w-xl text-lg leading-relaxed text-slate-400">
            Four decades of compassionate, ethical, patient-centred care — from a
            25-bed nursing clinic to a 100-bed multispeciality hospital where
            prevention meets cure.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          className="hero-fade pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            Scroll
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <span className="animate-hero-scroll h-1.5 w-1.5 rounded-full bg-primary-400" />
          </span>
        </div>
      </section>

      {/* ==================================================== MISSION STATEMENT */}
      <section className="stmt-section relative flex min-h-screen w-full items-center overflow-hidden px-6 sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/8 blur-[150px]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mb-10 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Our Ethos
          </div>
          <p className="font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.3] tracking-tight text-white sm:text-5xl sm:leading-[1.28] lg:text-6xl lg:leading-[1.25]">
            <StatementWords />
          </p>
        </div>
      </section>

      {/* ======================================================= LEGACY TIMELINE */}
      <section className="tl-section relative h-screen w-full overflow-hidden bg-white/[0.015]">
        {/* Section label — stays fixed while the track slides */}
        <div className="pointer-events-none absolute left-6 top-28 z-20 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300 sm:left-10 lg:left-16">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          Our Legacy
          <span className="hidden text-slate-600 sm:inline">— Four decades of trust</span>
        </div>

        <div className="tl-viewport flex h-full items-center">
          <div
            ref={trackRef}
            className="tl-track flex items-stretch gap-6 px-6 sm:gap-8 sm:px-10 lg:px-16"
          >
            {/* Intro panel */}
            <div className="tl-panel flex w-[82vw] shrink-0 items-center sm:w-[52vw] lg:w-[38vw]">
              <div className="tl-panel-inner">
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
                  Four decades of
                  <span className="block text-primary-500">trust &amp; care.</span>
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-400">
                  A journey from a single clinic to a landmark of multispeciality
                  medicine — scroll to trace the milestones.
                </p>
                <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span className="h-px w-10 bg-primary-500/70" />
                  1985 → Today
                </div>
              </div>
            </div>

            {TIMELINE.map((m, i) => {
              const Icon = m.Icon;
              return (
                <div
                  key={m.tag}
                  className="tl-panel flex w-[84vw] shrink-0 items-center sm:w-[46vw] lg:w-[30vw]"
                >
                  <div className="tl-panel-inner group relative h-[62vh] w-full overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] sm:p-10">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/12 via-transparent to-secondary-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    {/* Ghost index */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-8 right-1 select-none font-[family-name:var(--font-display)] text-[10rem] font-extrabold leading-none text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex h-full flex-col">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-primary-300 shadow-lg shadow-black/30">
                        <Icon size={30} weight="duotone" />
                      </span>

                      <span className="mt-auto text-sm font-semibold uppercase tracking-[0.24em] text-primary-400">
                        {m.tag}
                      </span>
                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {m.title}
                      </h3>
                      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-400">
                        {m.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Tail spacer */}
            <div className="w-[8vw] shrink-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* =========================================================== STATS BAND */}
      <section className="stats-band relative w-full border-t border-white/10 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-5 sm:grid-cols-3">
          {STATS.map((s) => {
            const { target, suffix, animatable } = parseStat(s.value);
            return (
              <div
                key={s.label}
                className="lux-up group relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-primary-500/40 sm:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="relative font-[family-name:var(--font-display)] text-6xl font-bold tracking-tight text-primary-500 sm:text-7xl">
                  {animatable ? (
                    <span className="js-count" data-value={target} data-suffix={suffix}>
                      0{suffix}
                    </span>
                  ) : (
                    s.value
                  )}
                </div>
                <div className="relative mt-4 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-400">
                  <span className="h-px w-6 bg-primary-500/60" />
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =============================================================== MOTTO */}
      <section className="relative w-full overflow-hidden border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        {/* Ambient brand glows (no flat watermark) */}
        <div
          className="pointer-events-none absolute -left-32 top-24 h-[26rem] w-[26rem] rounded-full bg-primary-500/8 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-secondary-500/8 blur-[150px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="lux-up flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Our Motto
            <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden text-slate-500 sm:block">Three Pillars</span>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="lux-up font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              Where prevention
              <span className="block text-primary-500">meets cure.</span>
            </h2>
            <p className="lux-up max-w-xs text-base leading-relaxed text-slate-400 lg:pb-3">
              Three principles guide every decision we make — from the first
              screening to the final follow-up.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {MOTTO.map((m, i) => {
              const Icon = m.Icon;
              return (
                <div
                  key={m.heading}
                  className="lux-up group relative flex flex-col overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-500/40 hover:shadow-[0_40px_90px_-45px_rgba(245,131,37,0.45)] sm:p-9"
                >
                  {/* top accent line, reveals on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* corner glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary-500/12 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  {/* faint sheen */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-500/25 bg-gradient-to-br from-primary-500/25 to-primary-500/[0.04] text-primary-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-12px_rgba(245,131,37,0.5)] transition-all duration-500 group-hover:border-primary-500/50 group-hover:from-primary-500/35">
                      <Icon size={30} weight="duotone" />
                    </span>
                    <span
                      className="select-none font-[family-name:var(--font-display)] text-5xl font-extrabold leading-none text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="relative mt-8 h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent"
                  />

                  <h3 className="relative mt-6 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
                    {m.heading}
                  </h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-slate-400">
                    {m.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= LEADERSHIP */}
      <section className="relative w-full border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="lux-up flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Voices of Mātru
            <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden text-slate-500 sm:block">Leadership</span>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
            <LeaderCard {...CHAIRMAN} feature />
            <div className="grid gap-5">
              {OTHERS.map((m) => (
                <LeaderCard key={m.name} {...m} />
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <div className="lux-up mt-16">
            <div className="bg-brand-gradient relative overflow-hidden rounded-[var(--radius-surface)] p-8 shadow-lg shadow-primary-500/20 sm:p-12">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:12px_12px]"
              />
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                    Experience care, the Mātru way.
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
                    Explore our centres of excellence or book a consultation with
                    the specialists behind four decades of trusted care.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/departments"
                    className="group inline-flex items-center gap-3 bg-white py-2.5 pl-5 pr-2.5 text-sm font-semibold text-primary-700 shadow-md transition-all duration-300 hover:bg-primary-50"
                  >
                    View Departments
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-200 bg-primary-100 text-primary-700 transition-colors duration-300 group-hover:bg-primary-200">
                      <ArrowUpRightIcon size={16} weight="bold" />
                    </span>
                  </a>
                  <a
                    href="#book-appointment"
                    className="inline-flex items-center gap-2 border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                  >
                    Book appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------- LeaderCard */

function LeaderCard({
  name,
  role,
  message,
  feature = false,
}: {
  name: string;
  role: string;
  message: string;
  feature?: boolean;
}) {
  return (
    <figure className="lux-up h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-primary-500/40 sm:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          className="pointer-events-none absolute -left-1 -top-10 font-[family-name:var(--font-display)] text-[9rem] leading-none text-primary-500/15"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote
          className={`relative font-medium leading-[1.55] tracking-tight text-slate-200 ${
            feature ? "text-xl sm:text-[1.7rem] sm:leading-[1.5]" : "text-lg sm:text-xl"
          }`}
        >
          {message}
        </blockquote>
        <figcaption className="relative mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <span className="leader-ring absolute inset-0 rounded-full p-[2px]" aria-hidden="true">
              <span className="block h-full w-full rounded-full bg-[#0a0b0d]" />
            </span>
            <span className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-lg shadow-primary-500/30">
              {monogram(name)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-display)] text-lg font-bold text-white">
              {name}
            </p>
            <p className="truncate text-xs font-semibold uppercase tracking-[0.15em] text-primary-400">
              {role}
            </p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
