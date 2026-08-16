"use client";

import { useEffect, useRef } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  PillIcon,
  FirstAidKitIcon,
  SyringeIcon,
  LeafIcon,
  ChatCircleTextIcon,
  TruckIcon,
  BookOpenIcon,
  StethoscopeIcon,
  HeartStraightIcon,
  FlaskIcon,
  UsersThreeIcon,
  GraduationCapIcon,
  StudentIcon,
  SealCheckIcon,
  CertificateIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowUpRightIcon,
  PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ content */

const PHARMA_STORY = [
  "During the first wave of the COVID-19 pandemic, Neighbourhood Pharma began as a community initiative — ensuring uninterrupted access to essential medicines for senior citizens, patients with chronic illnesses, and families living far from their loved ones.",
  "What started as a doorstep delivery service has grown into Mātru's dedicated in-house pharmacy: genuine prescription medicines, over-the-counter products, vaccines, wellness essentials, and pharmaceutical guidance — all under one roof.",
];

const PHARMA_SERVICES: { title: string; body: string; Icon: Icon }[] = [
  { title: "Prescription Medicines", body: "Genuine, verified, dispensed with pharmacist oversight.", Icon: PillIcon },
  { title: "Over-the-Counter", body: "Everyday self-care essentials, always in stock.", Icon: FirstAidKitIcon },
  { title: "Vaccines", body: "Cold-chain stored, administered to clinical standards.", Icon: SyringeIcon },
  { title: "Wellness Essentials", body: "Nutrition and supplements to support recovery.", Icon: LeafIcon },
  { title: "Pharmaceutical Guidance", body: "Clear counsel on dosage, interactions, and safe use — so every prescription is understood, not just handed over.", Icon: ChatCircleTextIcon },
  { title: "Doorstep Delivery", body: "The founding promise, still kept — medicines carried to those who cannot step out.", Icon: TruckIcon },
];

const INSTITUTES: { name: string; tag: string; body: string; Icon: Icon }[] = [
  {
    name: "Matru Institute of Nursing",
    tag: "Founded & Managed by Mātru",
    body: "Learning within a working multispeciality hospital — where classroom theory meets the bedside from the very first year.",
    Icon: GraduationCapIcon,
  },
  {
    name: "LIMA Institute of Nursing Sciences",
    tag: "A Sister Institution",
    body: "The same multidisciplinary environment and standards — nurturing technical competence and quiet professional confidence.",
    Icon: StudentIcon,
  },
];

const PILLARS: { title: string; body: string; Icon: Icon }[] = [
  { title: "Academic Excellence", body: "A rigorous curriculum affiliated with RGUHS, Bengaluru.", Icon: BookOpenIcon },
  { title: "Clinical Training", body: "Structured rotations inside a live multispeciality hospital.", Icon: StethoscopeIcon },
  { title: "Simulation Learning", body: "Skills labs and simulation before the real bedside.", Icon: FlaskIcon },
  { title: "Real-world Interaction", body: "Supervised patient care, hands-on from early on.", Icon: UsersThreeIcon },
  { title: "Compassionate Values", body: "Ethics and empathy woven through every module.", Icon: HeartStraightIcon },
];

const ACCREDITATIONS: { abbr: string; full: string; role: string; Icon: Icon }[] = [
  { abbr: "RGUHS", full: "Rajiv Gandhi University of Health Sciences, Bengaluru", role: "Affiliated", Icon: SealCheckIcon },
  { abbr: "KSNC", full: "Karnataka State Nursing Council", role: "Recognised", Icon: CertificateIcon },
  { abbr: "Govt. of Karnataka", full: "Government of Karnataka", role: "Approved", Icon: ShieldCheckIcon },
];

/* ------------------------------------------------------------------ helpers */

function Corners({ className = "" }: { className?: string }) {
  const base = "pointer-events-none absolute h-3 w-3 border-primary-500/50";
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

function Rule() {
  return (
    <span className="flex items-center gap-2" aria-hidden="true">
      <span className="h-1 w-1 rounded-full accent-dot" />
      <span className="h-px w-full accent-line" />
    </span>
  );
}

/* ----------------------------------------------------------------- component */

export default function PMVContent() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    /* ---- Decode / scramble text ---- */
    const scramble = (node: HTMLElement) => {
      const orig = node.dataset.text ?? (node.dataset.text = node.textContent || "");
      if (reduce) {
        node.textContent = orig;
        return;
      }
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·/&";
      const dur = 740;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const shown = Math.floor(p * orig.length);
        let out = "";
        for (let i = 0; i < orig.length; i++) {
          const c = orig[i];
          out += i < shown || c === " " ? c : chars[(Math.random() * chars.length) | 0];
        }
        node.textContent = out;
        if (p < 1) requestAnimationFrame(step);
        else node.textContent = orig;
      };
      requestAnimationFrame(step);
    };

    /* ---- Reveal (clip wipe for tiles, rise for text) ---- */
    const revealNode = (node: HTMLElement) => {
      if (reduce) {
        gsap.set(node, { opacity: 1, y: 0, clipPath: "none" });
      } else if (node.classList.contains("rvt")) {
        gsap.to(node, { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out" });
      } else {
        gsap.to(node, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
      }
      node.querySelectorAll<HTMLElement>("[data-scramble]").forEach(scramble);
    };

    if (!reduce) {
      gsap.set(el.querySelectorAll(".rv"), { y: 30 });
      gsap.set(el.querySelectorAll(".rvt"), { clipPath: "inset(0 0 18% 0)" });
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          revealNode(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    const vh = window.innerHeight;
    el.querySelectorAll<HTMLElement>(".rv, .rvt").forEach((n) =>
      n.getBoundingClientRect().top < vh * 0.94 ? revealNode(n) : io.observe(n)
    );
    cleanups.push(() => io.disconnect());

    /* ---- Scroll-scrubbed motion (GSAP ScrollTrigger) ---- */
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Giant chapter numerals: parallax drift + scroll-velocity skew.
      const nums = gsap.utils.toArray<HTMLElement>(".vnum");
      nums.forEach((n) => {
        gsap.to(n, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: n, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      const skewSetters = nums.map((n) => gsap.quickTo(n, "skewY", { duration: 0.5, ease: "power3" }));
      if (skewSetters.length) {
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-8, 8, self.getVelocity() / -240);
            skewSetters.forEach((fn) => fn(v));
          },
        });
      }

      // Floating capsule motifs — parallax.
      gsap.utils.toArray<HTMLElement>(".floaty").forEach((f) => {
        const sp = parseFloat(f.dataset.speed || "0");
        const sec = f.closest("section") || f;
        gsap.to(f, {
          yPercent: sp,
          ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, el);

    /* ---- Right chapter rail ---- */
    const chapters = Array.from(el.querySelectorAll<HTMLElement>("[data-chapter]"));
    const markers = Array.from(el.querySelectorAll<HTMLElement>("[data-marker]"));
    if (chapters.length && markers.length) {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const id = (e.target as HTMLElement).dataset.chapter;
            markers.forEach((m) => m.classList.toggle("is-active", m.dataset.marker === id));
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      chapters.forEach((c) => io2.observe(c));
      cleanups.push(() => io2.disconnect());
    }

    /* ---- Magnetic 3D hover + cursor spotlight (fine pointers only) ---- */
    if (fine && !reduce) {
      el.querySelectorAll<HTMLElement>(".mag").forEach((card) => {
        const strength = parseFloat(card.dataset.mag || "0.18");
        const tilt = card.dataset.tilt !== undefined ? parseFloat(card.dataset.tilt || "10") : 0;
        const xTo = gsap.quickTo(card, "x", { duration: 0.55, ease: "power3" });
        const yTo = gsap.quickTo(card, "y", { duration: 0.55, ease: "power3" });
        const rxTo = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        const ryTo = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        const scTo = gsap.quickTo(card, "scale", { duration: 0.5, ease: "power3" });

        const enter = () => scTo(tilt ? 1.03 : 1.05);
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          xTo(nx * r.width * strength);
          yTo(ny * r.height * strength);
          if (tilt) {
            ryTo(nx * tilt);
            rxTo(-ny * tilt);
          }
          card.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
          card.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
          rxTo(0);
          ryTo(0);
          scTo(1);
        };
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

      // Hero cursor parallax — depth layers drift with the pointer.
      const hero = el.querySelector<HTMLElement>(".pmv-hero");
      if (hero) {
        const layers = Array.from(hero.querySelectorAll<HTMLElement>(".hparallax"));
        const setters = layers.map((l) => ({
          x: gsap.quickTo(l, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(l, "y", { duration: 0.9, ease: "power3" }),
          d: parseFloat(l.dataset.depth || "18"),
        }));
        const hMove = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.d);
            s.y(ny * s.d);
          });
        };
        hero.addEventListener("pointermove", hMove);
        cleanups.push(() => hero.removeEventListener("pointermove", hMove));
      }
    }

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 360);
    cleanups.push(() => window.clearTimeout(t));

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="pmv relative overflow-x-clip bg-[#08090b] text-slate-200">
      <style>{`
        .pmv { --accent: 245,131,37; }
        .pmv .chapter-pharma  { --accent: 22,188,191; }
        .pmv .chapter-nursing { --accent: 245,131,37; }

        .pmv .rv, .pmv .rvt { opacity: 0; }
        @media (prefers-reduced-motion: reduce) { .pmv .rv, .pmv .rvt { opacity: 1 !important; } }

        .pmv .accent { color: rgb(var(--accent)); }
        .pmv .accent-dot { background: rgb(var(--accent)); }
        .pmv .accent-line { background: linear-gradient(to right, rgba(var(--accent),.7), transparent); }
        .pmv .accent-soft { color: rgba(var(--accent),.85); }

        .pmv .stage { perspective: 1300px; }

        /* Couture tile — magnetic 3D, spotlight, top accent line */
        .pmv .tile { position: relative; overflow: hidden; will-change: transform;
          border: 1px solid rgba(255,255,255,.08);
          background: linear-gradient(to bottom, rgba(255,255,255,.05), rgba(255,255,255,.012));
          transition: border-color .5s ease, box-shadow .5s ease; }
        .pmv .tile:hover { border-color: rgba(var(--accent),.5);
          box-shadow: 0 44px 100px -50px rgba(var(--accent),.6); }
        .pmv .tile::before { content: ""; position: absolute; top: 0; left: 14%; right: 14%; height: 1px; z-index: 3;
          background: linear-gradient(to right, transparent, rgba(var(--accent),.95), transparent);
          opacity: 0; transition: opacity .5s ease; }
        .pmv .tile:hover::before { opacity: 1; }
        .pmv .spot::after { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(var(--accent),.18), transparent 60%);
          opacity: 0; transition: opacity .5s ease; }
        .pmv .spot:hover::after { opacity: 1; }
        .pmv .tile > * { position: relative; z-index: 2; }

        .pmv .medal { color: rgb(var(--accent));
          border: 1px solid rgba(var(--accent),.28);
          background: linear-gradient(135deg, rgba(var(--accent),.22), rgba(var(--accent),.03));
          box-shadow: inset 0 1px 0 0 rgba(255,255,255,.08), 0 12px 30px -14px rgba(var(--accent),.5); }
        .pmv .chip { border: 1px solid rgba(var(--accent),.3); background: rgba(var(--accent),.1); color: rgb(var(--accent)); }

        .pmv [data-marker] .mk-num { color: rgba(255,255,255,.28); transition: color .4s ease; }
        .pmv [data-marker] .mk-bar { background: rgba(255,255,255,.14); transition: background .4s ease, height .4s ease; }
        .pmv [data-marker].is-active .mk-num { color: rgb(var(--accent)); }
        .pmv [data-marker].is-active .mk-bar { background: rgb(var(--accent)); height: 2.5rem; }

        .pmv .step-line { background: linear-gradient(to bottom, rgba(var(--accent),.6), rgba(var(--accent),.05)); }
        .pmv [data-scramble] { display: inline-block; }
      `}</style>

      {/* Right-side chapter rail */}
      <nav className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex" aria-hidden="true">
        <div data-marker="pharma" className="chapter-pharma flex flex-col items-center gap-2">
          <span className="mk-num font-[family-name:var(--font-display)] text-sm font-bold">01</span>
          <span className="mk-bar h-6 w-px rounded-full" />
        </div>
        <div data-marker="nursing" className="chapter-nursing flex flex-col items-center gap-2">
          <span className="mk-num font-[family-name:var(--font-display)] text-sm font-bold">02</span>
          <span className="mk-bar h-6 w-px rounded-full" />
        </div>
      </nav>

      {/* ============================================================ HERO */}
      <section className="pmv-hero relative w-full px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hparallax animate-hero-float absolute -right-40 -top-20 h-[40rem] w-[40rem] rounded-full bg-primary-500/12 blur-[170px]" data-depth="26" />
          <div className="hparallax animate-hero-float absolute -left-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-secondary-500/12 blur-[170px]" data-depth="34" style={{ animationDelay: "-6s" }} />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 12px)",
              maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, #000 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, #000 30%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl rounded-[calc(var(--radius-surface)+6px)] border border-white/10 bg-white/[0.015] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <Corners className="absolute inset-3 block" />

          <div className="rv flex items-center justify-between border-b border-white/10 pb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            <span className="text-primary-400">Mātru / PMV</span>
            <span className="hidden sm:block">Community &amp; Education</span>
            <span>Edition 01</span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
            <div>
              <div className="rv flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">
                <PlusIcon size={12} weight="bold" />
                <span data-scramble>Beyond the Hospital</span>
              </div>
              <h1 className="rv mt-8 font-[family-name:var(--font-display)] text-[3.4rem] font-extrabold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
                One promise.
                <span className="block">
                  <span className="text-secondary-400">Two</span>{" "}
                  <span className="text-primary-500">frontiers.</span>
                </span>
              </h1>
              <p className="rv mt-8 max-w-lg text-lg leading-relaxed text-slate-400">
                Mātru&apos;s care reaches past its wards — a 24/7 neighbourhood
                pharmacy that arrives at every doorstep, and two nursing
                institutes shaping the caregivers of tomorrow.
              </p>

              <div className="rv mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-7">
                {[
                  { k: "24/7", v: "In-house Pharmacy" },
                  { k: "02", v: "Nursing Institutes" },
                  { k: "1985", v: "Founding Values" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">{s.k}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* bento preview cluster — magnetic 3D tiles */}
            <div className="stage grid grid-cols-2 gap-3">
              {[
                { Icon: PillIcon, k: "In-house", v: "Pharmacy", teal: true },
                { Icon: TruckIcon, k: "Doorstep", v: "Delivery", teal: true },
                { Icon: GraduationCapIcon, k: "Two", v: "Institutes", teal: false },
                { Icon: SealCheckIcon, k: "RGUHS · KSNC", v: "Accredited", teal: false },
              ].map((t, i) => {
                const Ic = t.Icon;
                return (
                  <div
                    key={i}
                    data-tilt="12"
                    data-mag="0.16"
                    className={`tile spot mag rvt flex flex-col justify-between rounded-[var(--radius-surface)] p-5 ${
                      t.teal ? "chapter-pharma" : "chapter-nursing"
                    }`}
                  >
                    <span className="medal flex h-11 w-11 items-center justify-center rounded-xl">
                      <Ic size={22} weight="duotone" />
                    </span>
                    <div className="mt-6">
                      <div className="font-[family-name:var(--font-display)] text-base font-bold text-white">{t.k}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{t.v}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== 01 · PHARMA (teal) */}
      <section data-chapter="pharma" className="chapter-pharma relative w-full overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="pointer-events-none absolute -left-40 top-24 h-[30rem] w-[30rem] rounded-full bg-secondary-500/10 blur-[160px]" aria-hidden="true" />
        <span className="floaty animate-hero-float pointer-events-none absolute right-[8%] top-24 h-16 w-7 rounded-full border border-secondary-500/25 bg-secondary-500/5" data-speed="-30" aria-hidden="true" />
        <span className="floaty animate-hero-float pointer-events-none absolute right-[16%] top-40 h-10 w-4 rounded-full border border-secondary-500/20" data-speed="40" aria-hidden="true" style={{ animationDelay: "-4s" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="rv grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-10">
            <div className="flex items-end gap-5">
              <span className="vnum select-none font-[family-name:var(--font-display)] text-[7rem] font-extrabold leading-[0.8] text-transparent sm:text-[9rem]" style={{ WebkitTextStroke: "1px rgba(22,188,191,0.35)" }}>
                01
              </span>
              <div className="pb-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] accent" data-scramble>
                  Neighbourhood Pharma
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">24 / 7 · In-house</div>
              </div>
            </div>
            <div className="pb-4"><Rule /></div>
          </div>

          {/* Bento grid — magnetic 3D tiles */}
          <div className="stage mt-14 grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div data-tilt="7" data-mag="0.1" className="tile spot mag rvt flex flex-col justify-between rounded-[var(--radius-surface)] p-8 sm:col-span-2 lg:row-span-2 sm:p-10">
              <div>
                <span className="chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  <ClockIcon size={13} weight="bold" /> Born in the first wave of COVID-19
                </span>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
                  A pharmacy that
                  <span className="block accent">never sleeps.</span>
                </h2>
                <div className="mt-6 space-y-4">
                  {PHARMA_STORY.map((p, i) => (
                    <p key={i} className="max-w-md text-[15px] leading-relaxed text-slate-400">{p}</p>
                  ))}
                </div>
              </div>
              <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-6xl font-bold tracking-tight accent sm:text-7xl">24/7</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Uninterrupted access</div>
                </div>
                <span className="medal flex h-14 w-14 items-center justify-center rounded-2xl">
                  <PillIcon size={28} weight="duotone" />
                </span>
              </div>
            </div>

            {PHARMA_SERVICES.map((s, i) => {
              const Ic = s.Icon;
              const wide = i >= 4;
              return (
                <div key={s.title} data-tilt="12" data-mag="0.18" className={`tile spot mag rvt flex flex-col rounded-[var(--radius-surface)] p-6 ${wide ? "sm:col-span-2" : ""}`}>
                  <div className="flex items-start justify-between">
                    <span className="medal flex h-12 w-12 items-center justify-center rounded-xl">
                      <Ic size={24} weight="duotone" />
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-700">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== 02 · NURSING (orange) */}
      <section data-chapter="nursing" className="chapter-nursing relative w-full overflow-hidden border-t border-white/10 bg-white/[0.015] px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="pointer-events-none absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full bg-primary-500/10 blur-[160px]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(245,131,37,0.08) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 70% 20%, #000, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 70% 20%, #000, transparent 75%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="rv grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-10">
            <div className="flex items-end gap-5">
              <span className="vnum select-none font-[family-name:var(--font-display)] text-[7rem] font-extrabold leading-[0.8] text-transparent sm:text-[9rem]" style={{ WebkitTextStroke: "1px rgba(245,131,37,0.35)" }}>
                02
              </span>
              <div className="pb-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] accent" data-scramble>
                  Institutes of Nursing
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Education &amp; Excellence</div>
              </div>
            </div>
            <div className="pb-4"><Rule /></div>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="rv font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.0] tracking-tight text-white sm:text-5xl">
                Shaping the caregivers
                <span className="block accent">of tomorrow.</span>
              </h2>
              <p className="rv mt-6 max-w-md text-[15px] leading-relaxed text-slate-400">
                Exceptional patient care begins with exceptional education —
                learned inside a living, multidisciplinary hospital. Both
                institutions are established and managed by the founders of Mātru.
              </p>

              <div className="rv mt-10">
                <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500" data-scramble>
                  How we teach
                </div>
                <ol className="relative">
                  <span className="step-line absolute bottom-4 left-[1.4rem] top-4 w-px" aria-hidden="true" />
                  {PILLARS.map((p) => {
                    const Ic = p.Icon;
                    return (
                      <li key={p.title} className="relative flex gap-5 pb-7 last:pb-0">
                        <span className="medal relative z-10 flex h-[2.8rem] w-[2.8rem] shrink-0 items-center justify-center rounded-full bg-[#0d0f12]">
                          <Ic size={20} weight="duotone" />
                        </span>
                        <div className="pt-1.5">
                          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">{p.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div>
              <div className="stage grid gap-4 sm:grid-cols-2">
                {INSTITUTES.map((inst) => {
                  const Ic = inst.Icon;
                  return (
                    <div key={inst.name} data-tilt="11" data-mag="0.16" className="tile spot mag rvt flex flex-col rounded-[var(--radius-surface)] p-7">
                      <span className="medal flex h-14 w-14 items-center justify-center rounded-2xl">
                        <Ic size={28} weight="duotone" />
                      </span>
                      <span className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] accent-soft">{inst.tag}</span>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-white">{inst.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{inst.body}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rvt mt-6 rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] p-7">
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  <span className="h-px w-6 accent-line" />
                  Accreditations &amp; Approvals
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {ACCREDITATIONS.map((a) => {
                    const Ic = a.Icon;
                    return (
                      <div key={a.abbr} className="flex flex-col">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-md shadow-primary-500/25">
                            <Ic size={18} weight="fill" />
                          </span>
                          <span className="chip rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]">{a.role}</span>
                        </div>
                        <p className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-white">{a.abbr}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.full}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================== CLOSING CTA */}
      <section className="relative w-full px-4 py-20 sm:px-6 lg:px-10">
        <div className="rvt relative mx-auto w-full max-w-7xl overflow-hidden rounded-[calc(var(--radius-surface)+6px)] border border-white/12 bg-white/[0.02] p-8 sm:p-14">
          <Corners className="absolute inset-3 block" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/12 blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary-500/12 blur-[120px]" aria-hidden="true" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-300">
                <PlusIcon size={12} weight="bold" /> One institution, care in every direction
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                From your doorstep
                <span className="block">
                  <span className="text-secondary-400">to the</span>{" "}
                  <span className="text-primary-500">classroom.</span>
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/departments" data-mag="0.4" className="mag group inline-flex items-center gap-3 bg-primary-500 py-3 pl-6 pr-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-colors duration-300 hover:bg-primary-600">
                View Departments
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                  <ArrowUpRightIcon size={16} weight="bold" />
                </span>
              </a>
              <a href="#book-appointment" data-mag="0.4" className="mag inline-flex items-center justify-center border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5">
                Book appointment
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
