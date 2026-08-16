"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  StarIcon,
  QuotesIcon,
  PlayIcon,
  SealCheckIcon,
  ThumbsUpIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ArrowUpRightIcon,
  VideoCameraIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";

/* ============================================================ placeholder data
   NOTE: written testimonials below are randomised placeholder copy — swap for
   real patient quotes. Video slots are intentionally left empty (poster + play
   button) so real footage can be dropped in later (see VideoCard). */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

const FEATURED: Testimonial[] = [
  {
    quote:
      "From the moment we walked in, we were treated like family. The surgical team explained every step, and my father was walking again within weeks. I will never forget the care we received here.",
    name: "Ananya Rao",
    role: "Daughter of a Joint Replacement patient",
    rating: 5,
  },
  {
    quote:
      "The oncology team gave us more than treatment — they gave us hope, dignity, and a plan for every step. Compassion like this is rare, and it made all the difference in our recovery.",
    name: "Rajesh Menon",
    role: "Oncology patient",
    rating: 5,
  },
  {
    quote:
      "Our baby spent ten days in the NICU. The nurses updated us every hour and never let us feel alone. Today our little one is home and thriving. We owe them everything.",
    name: "Priya & Karthik",
    role: "NICU parents",
    rating: 5,
  },
];

const WALL: Testimonial[] = [
  { quote: "Emergency care was fast and calm. Within minutes I was stabilised and reassured. Truly life-saving.", name: "Vikram Shetty", role: "Emergency & Trauma Care", rating: 5 },
  { quote: "My cardiologist took time to actually listen. The 2D echo was quick and the follow-up was thorough.", name: "Meera Nair", role: "Cardiology", rating: 5 },
  { quote: "The physiotherapy team rebuilt my confidence step by step. I'm back to my morning runs.", name: "Arjun Pillai", role: "Physiotherapy & Rehab", rating: 5 },
  { quote: "Spotless facility, warm staff, and zero waiting-room chaos. It felt more like a wellness retreat.", name: "Sana Fernandes", role: "General Medicine", rating: 4 },
  { quote: "The gynaecology team made my pregnancy journey calm and joyful. Water birth was a beautiful experience.", name: "Divya Kulkarni", role: "Obstetrics & Gynaecology", rating: 5 },
  { quote: "Painless dental-grade precision in the ENT surgery. My vertigo is finally gone after years.", name: "Imran Qureshi", role: "ENT", rating: 5 },
  { quote: "The neuro team's attention to detail is unmatched. My recovery outpaced every expectation.", name: "Lakshmi Iyer", role: "Neurology", rating: 5 },
  { quote: "Doorstep pharmacy delivery during my recovery was a blessing. Genuine medicines, on time, every time.", name: "Gopal Reddy", role: "Neighbourhood Pharma", rating: 5 },
  { quote: "The paediatric ward is a child's world — my son forgot he was even in a hospital.", name: "Nisha Verma", role: "Paediatrics", rating: 5 },
  { quote: "Dermatology results were visible within weeks. Evidence-based, honest, and never over-prescribed.", name: "Ritu Agarwal", role: "Dermatology", rating: 4 },
  { quote: "The ICU team's communication kept our whole family calm through the hardest week of our lives.", name: "Suresh Babu", role: "Critical Care", rating: 5 },
  { quote: "Plastic surgery consult was honest and unhurried. Natural results, exactly as promised.", name: "Aisha Khan", role: "Aesthetic & Plastic Surgery", rating: 5 },
  { quote: "Radiology reports were ready the same day with a clear explanation. No jargon, just clarity.", name: "Mahesh Gowda", role: "Radiology", rating: 5 },
  { quote: "Urology care was discreet, professional, and minimally invasive. Home the very next day.", name: "Farhan Ali", role: "Urology & Nephrology", rating: 5 },
  { quote: "The counselling team gave me tools, not just prescriptions. A safe, judgement-free space.", name: "Kavya Menon", role: "Psychology & Psychiatry", rating: 5 },
  { quote: "Laparoscopic surgery meant tiny scars and a fast recovery. Back to work in a week.", name: "Deepak Joshi", role: "Laparoscopic Surgery", rating: 4 },
];

const REVIEWS: (Testimonial & { date: string; helpful: number; verified: boolean })[] = [
  { name: "Harini Subramanian", role: "Obstetrics & Gynaecology", rating: 5, date: "2 weeks ago", helpful: 34, verified: true, quote: "I delivered my second child here and the difference from my first hospital was night and day. The antenatal classes, the lactation support, the postpartum care — everything was thoughtful. The room was immaculate and the nursing staff genuinely cared. I felt safe the entire time." },
  { name: "Naveen Kumar", role: "Orthopaedics & Spine", rating: 5, date: "1 month ago", helpful: 51, verified: true, quote: "Robotic-assisted knee replacement and I was on my feet the next morning. The physiotherapy plan was clear and the surgeon personally followed up twice after discharge. Worth every rupee." },
  { name: "Fatima Sheikh", role: "Oncology", rating: 5, date: "1 month ago", helpful: 47, verified: true, quote: "The Oncare wing coordinated my chemotherapy, nutrition, and counselling under one roof. I never had to run between departments. That coordination during cancer treatment is priceless." },
  { name: "Rohit Desai", role: "Emergency & Trauma", rating: 4, date: "3 weeks ago", helpful: 18, verified: true, quote: "Brought my father in after an accident at 2 AM. The trauma team was ready and fast. Only reason for four stars is the billing desk was a little slow, but the medical care was flawless." },
  { name: "Sneha Pillai", role: "Paediatrics", rating: 5, date: "2 months ago", helpful: 29, verified: true, quote: "The paediatrician was patient with my anxious questions and never rushed us. My daughter actually looks forward to her check-ups now, which says everything." },
  { name: "Abdul Rahman", role: "Cardiology", rating: 5, date: "5 days ago", helpful: 12, verified: true, quote: "Preventive cardiology screening caught an issue early that two other clinics missed. Calm explanation, clear plan, and a lifestyle programme that actually works. Grateful." },
];

const RATING_BREAKDOWN = [
  { star: 5, pct: 86 },
  { star: 4, pct: 10 },
  { star: 3, pct: 3 },
  { star: 2, pct: 1 },
  { star: 1, pct: 0 },
];

const VIDEOS = [
  { name: "Ananya Rao", role: "Joint Replacement", duration: "2:14", grad: "from-primary-500/30 to-secondary-500/20" },
  { name: "Rajesh Menon", role: "Oncology", duration: "3:02", grad: "from-secondary-500/30 to-primary-500/15" },
  { name: "Priya & Karthik", role: "NICU Journey", duration: "1:48", grad: "from-primary-500/25 to-primary-700/20" },
  { name: "Vikram Shetty", role: "Emergency Care", duration: "2:37", grad: "from-secondary-500/25 to-secondary-700/20" },
  { name: "Divya Kulkarni", role: "Water Birth", duration: "4:11", grad: "from-primary-500/30 to-secondary-500/25" },
];

/* ------------------------------------------------------------------ helpers */

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z& ]/g, "").trim().split(/\s+/).filter((w) => w !== "&");
  const letters = words.length > 1 ? words[0][0] + words[1][0] : words[0]?.slice(0, 2) ?? "";
  return letters.toUpperCase();
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          size={size}
          weight={i <= Math.round(rating) ? "fill" : "regular"}
          className={i <= Math.round(rating) ? "text-primary-400" : "text-slate-700"}
        />
      ))}
    </span>
  );
}

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const inner = size - 5;
  return (
    <span className="relative flex shrink-0 items-center justify-center" style={{ height: size, width: size }}>
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-80" />
      <span
        className="relative flex items-center justify-center rounded-full bg-[#0d0f12] font-[family-name:var(--font-display)] font-bold text-white"
        style={{ height: inner, width: inner, fontSize: size * 0.3 }}
      >
        {monogram(name)}
      </span>
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="group relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.012] p-6 transition-colors duration-500 hover:border-primary-500/40">
      <QuotesIcon
        size={40}
        weight="fill"
        className="pointer-events-none absolute -right-1 -top-1 text-primary-500/10 transition-colors duration-500 group-hover:text-primary-500/20"
        aria-hidden="true"
      />
      <Stars rating={t.rating} />
      <blockquote className="relative mt-4 text-[15px] leading-relaxed text-slate-300">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <Avatar name={t.name} size={40} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-white">{t.name}</span>
            <SealCheckIcon size={14} weight="fill" className="shrink-0 text-secondary-400" />
          </div>
          <div className="truncate text-xs text-slate-500">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function VideoCard({ v, featured = false }: { v: (typeof VIDEOS)[number]; featured?: boolean }) {
  return (
    <div
      className={`group relative shrink-0 snap-start overflow-hidden rounded-[var(--radius-surface)] border border-white/10 ${
        featured ? "aspect-[4/5] w-[300px] sm:w-[360px]" : "aspect-[9/16] w-[220px] sm:w-[240px]"
      }`}
    >
      {/*
        VIDEO SLOT — drop a real review here later, e.g.:
        <video className="absolute inset-0 h-full w-full object-cover" poster="/reviews/ananya.jpg" controls>
          <source src="/reviews/ananya.mp4" type="video/mp4" />
        </video>
        For now we render a cinematic poster placeholder.
      */}
      <div className={`absolute inset-0 bg-gradient-to-br ${v.grad}`} aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.5] mix-blend-overlay"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" aria-hidden="true" />

      {/* top row */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
          <VideoCameraIcon size={12} weight="fill" /> Review
        </span>
        <span className="rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-semibold text-white/80 backdrop-blur-sm">
          {v.duration}
        </span>
      </div>

      {/* play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full">
          <span className="absolute inset-0 rounded-full bg-primary-500/30 blur-md transition-all duration-500 group-hover:bg-primary-500/50" aria-hidden="true" />
          <span className="absolute inset-0 rounded-full border border-white/40 transition-transform duration-700 group-hover:scale-110" aria-hidden="true" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary-700 shadow-xl transition-transform duration-500 group-hover:scale-105">
            <PlayIcon size={22} weight="fill" className="ml-0.5" />
          </span>
        </span>
      </div>

      {/* lower third */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center gap-2.5">
          <Avatar name={v.name} size={34} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">{v.name}</div>
            <div className="truncate text-[11px] uppercase tracking-[0.14em] text-white/60">{v.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- component */

export default function TestimonialsContent() {
  const root = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Featured quote auto-rotation.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % FEATURED.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  // Reveal on scroll, count-ups, and rating bars.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runCount = (node: HTMLElement) => {
      if (node.dataset.counted) return;
      node.dataset.counted = "1";
      const target = Number(node.dataset.count || "0");
      const dec = Number(node.dataset.dec || "0");
      const suffix = node.dataset.suffix || "";
      if (reduce) {
        node.textContent = target.toFixed(dec) + suffix;
        return;
      }
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = (eased * target).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = target.toFixed(dec) + suffix;
      };
      requestAnimationFrame(tick);
    };

    const reveal = (node: HTMLElement) => {
      node.classList.add("in");
      node.querySelectorAll<HTMLElement>("[data-count]").forEach(runCount);
      node.querySelectorAll<HTMLElement>("[data-bar]").forEach((b) => {
        b.style.width = `${b.dataset.bar}%`;
      });
    };

    const targets = Array.from(el.querySelectorAll<HTMLElement>(".rv"));
    if (reduce) {
      targets.forEach(reveal);
      return;
    }
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          reveal(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((n) => (n.getBoundingClientRect().top < vh * 0.92 ? reveal(n) : io.observe(n)));
    return () => io.disconnect();
  }, []);

  const scrollRail = useCallback((dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  // Split the wall into 3 columns for the multi-speed marquee.
  const cols = [WALL.filter((_, i) => i % 3 === 0), WALL.filter((_, i) => i % 3 === 1), WALL.filter((_, i) => i % 3 === 2)];

  return (
    <div ref={root} className="tm relative overflow-x-clip bg-[#08090b] text-slate-200">
      <style>{`
        .tm .rv { opacity: 0; transform: translateY(28px);
          transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .tm .rv.in { opacity: 1; transform: none; }
        .tm [data-bar] { width: 0; transition: width 1.2s cubic-bezier(.16,1,.3,1) .2s; }

        @keyframes tm-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes tm-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .tm .tm-col { display: flex; flex-direction: column; gap: 1rem; animation: tm-up var(--dur,40s) linear infinite; will-change: transform; }
        .tm .tm-col.down { animation-name: tm-down; }
        .tm .tm-wall:hover .tm-col { animation-play-state: paused; }

        .tm .rail { scrollbar-width: none; -ms-overflow-style: none; }
        .tm .rail::-webkit-scrollbar { display: none; }

        @keyframes tm-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .tm .rv { opacity: 1 !important; transform: none !important; }
          .tm .tm-col { animation: none !important; }
        }
      `}</style>

      {/* ============================================================ HERO */}
      <section className="relative w-full overflow-hidden px-6 pb-16 pt-36 sm:px-10 sm:pt-44 lg:px-16">
        <div className="animate-hero-float pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-primary-500/12 blur-[170px]" aria-hidden="true" />
        <div className="animate-hero-float pointer-events-none absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full bg-secondary-500/10 blur-[160px]" aria-hidden="true" style={{ animationDelay: "-6s" }} />
        {/* floating stars */}
        {[
          { l: "12%", t: "22%", s: 14, d: "0s" },
          { l: "82%", t: "30%", s: 20, d: "-3s" },
          { l: "70%", t: "16%", s: 12, d: "-5s" },
          { l: "26%", t: "60%", s: 16, d: "-2s" },
        ].map((st, i) => (
          <StarIcon key={i} size={st.s} weight="fill" aria-hidden="true" className="animate-hero-float pointer-events-none absolute text-primary-500/20" style={{ left: st.l, top: st.t, animationDelay: st.d }} />
        ))}

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="rv flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Patient Voices
            <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden text-slate-500 sm:block">Real recoveries</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
            <h1 className="rv font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              The words that
              <span className="block text-primary-500">stay with us.</span>
            </h1>

            {/* aggregate rating panel */}
            <div className="rv rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.012] p-6">
              <div className="flex items-center gap-4">
                <div className="font-[family-name:var(--font-display)] text-5xl font-bold text-white">
                  <span data-count="4.9" data-dec="1">0.0</span>
                </div>
                <div>
                  <Stars rating={5} size={18} />
                  <div className="mt-1 text-xs text-slate-400">Average patient rating</div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-400">
                    <span data-count="2480" data-suffix="+">0</span>
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Verified reviews</div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-400">
                    <span data-count="98" data-suffix="%">0</span>
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Would recommend</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== FEATURED SPOTLIGHT */}
      <section
        className="relative w-full overflow-hidden border-t border-white/10 px-6 py-24 sm:px-10 sm:py-28 lg:px-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-primary-500/8 blur-[150px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <QuotesIcon size={64} weight="fill" className="mx-auto text-primary-500/25" aria-hidden="true" />

          <div className="relative mt-6 min-h-[13rem] sm:min-h-[11rem]">
            {FEATURED.map((f, i) => (
              <blockquote
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "translateY(0)" : "translateY(16px)",
                  pointerEvents: i === active ? "auto" : "none",
                }}
                aria-hidden={i !== active}
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-[1.4] tracking-tight text-white sm:text-4xl sm:leading-[1.35]">
                  {f.quote}
                </p>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Avatar name={FEATURED[active].name} size={52} />
            <div>
              <div className="font-[family-name:var(--font-display)] text-lg font-bold text-white">{FEATURED[active].name}</div>
              <div className="mt-0.5 text-xs uppercase tracking-[0.16em] text-primary-400">{FEATURED[active].role}</div>
            </div>
          </div>

          {/* controls */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + FEATURED.length) % FEATURED.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors duration-300 hover:border-primary-500/50 hover:text-primary-300"
              aria-label="Previous testimonial"
            >
              <CaretLeftIcon size={16} weight="bold" />
            </button>
            <div className="flex items-center gap-2">
              {FEATURED.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
                  style={{ width: i === active ? 40 : 8, background: i === active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.2)" }}
                >
                  {i === active && (
                    <span
                      key={`${active}-${paused}`}
                      className="absolute inset-0 origin-left rounded-full bg-primary-500"
                      style={{
                        animation: paused ? "none" : "tm-progress 6s linear forwards",
                        transform: paused ? "scaleX(1)" : undefined,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % FEATURED.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors duration-300 hover:border-primary-500/50 hover:text-primary-300"
              aria-label="Next testimonial"
            >
              <CaretRightIcon size={16} weight="bold" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= VIDEO REVIEWS */}
      <section className="relative w-full border-t border-white/10 px-6 py-24 sm:py-28 lg:pl-16">
        <div className="mx-auto w-full max-w-7xl px-0 sm:px-4 lg:pr-16">
          <div className="rv flex flex-wrap items-end justify-between gap-6 pr-6 sm:pr-10 lg:pr-0">
            <div>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                Video Reviews
              </div>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
                Watch their
                <span className="text-primary-500"> stories.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => scrollRail(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors duration-300 hover:border-primary-500/50 hover:text-primary-300" aria-label="Scroll left">
                <CaretLeftIcon size={18} weight="bold" />
              </button>
              <button type="button" onClick={() => scrollRail(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors duration-300 hover:border-primary-500/50 hover:text-primary-300" aria-label="Scroll right">
                <CaretRightIcon size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* horizontal rail of portrait video cards */}
          <div ref={railRef} className="rail rv mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-6 sm:pr-10 lg:pr-16">
            <VideoCard v={VIDEOS[0]} featured />
            {VIDEOS.slice(1).map((v) => (
              <VideoCard key={v.name} v={v} />
            ))}
            {/* trailing hint card */}
            <div className="flex aspect-[9/16] w-[220px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-[var(--radius-surface)] border border-dashed border-white/15 bg-white/[0.015] p-6 text-center sm:w-[240px]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-primary-300">
                <SparkleIcon size={22} weight="duotone" />
              </span>
              <p className="text-sm font-semibold text-white">Your story next?</p>
              <p className="text-xs leading-relaxed text-slate-400">Share your Mātru experience on camera.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== TEXT TESTIMONIAL WALL */}
      <section className="relative w-full overflow-hidden border-t border-white/10 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="rv mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              What patients say
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
              A wall of gratitude.
            </h2>
          </div>
        </div>

        {/* multi-speed marquee columns */}
        <div className="tm-wall relative mx-auto mt-16 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* top & bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#08090b] to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#08090b] to-transparent" aria-hidden="true" />
          {cols.map((col, ci) => (
            <div key={ci} className={`h-[38rem] overflow-hidden ${ci === 2 ? "hidden lg:block" : ci === 1 ? "hidden sm:block" : ""}`}>
              <div className={`tm-col ${ci === 1 ? "down" : ""}`} style={{ ["--dur" as string]: `${38 + ci * 8}s` }}>
                {[...col, ...col].map((t, i) => (
                  <TestimonialCard key={`${ci}-${i}`} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== REVIEWS + BREAKDOWN */}
      <section className="relative w-full border-t border-white/10 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* rating breakdown panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rv flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              Patient Reviews
            </div>
            <h2 className="rv mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Rated with care.
            </h2>

            <div className="rv mt-8 rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.012] p-7">
              <div className="flex items-end gap-4">
                <div className="font-[family-name:var(--font-display)] text-6xl font-bold text-white">
                  <span data-count="4.9" data-dec="1">0.0</span>
                </div>
                <div className="pb-2">
                  <Stars rating={5} size={18} />
                  <div className="mt-1 text-xs text-slate-400">
                    Based on <span data-count="2480" data-suffix="+" className="font-semibold text-slate-300">0</span> reviews
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                {RATING_BREAKDOWN.map((r) => (
                  <div key={r.star} className="flex items-center gap-3">
                    <span className="flex w-8 items-center gap-1 text-xs font-semibold text-slate-400">
                      {r.star}
                      <StarIcon size={11} weight="fill" className="text-primary-400" />
                    </span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                      <span data-bar={r.pct} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-400" />
                    </span>
                    <span className="w-9 text-right text-xs tabular-nums text-slate-500">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* review feed */}
          <div className="space-y-4">
            {REVIEWS.map((r) => (
              <article key={r.name} className="rv group relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-primary-500/30 sm:p-7">
                <span className="absolute left-0 top-6 h-10 w-[3px] rounded-r bg-primary-500/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <Avatar name={r.name} size={46} />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-white">{r.name}</span>
                        {r.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-500/12 px-2 py-0.5 text-[10px] font-semibold text-secondary-300">
                            <SealCheckIcon size={11} weight="fill" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-primary-400/90">{r.role}</span>
                        <span>·</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <Stars rating={r.rating} size={15} />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{r.quote}</p>
                <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-slate-500">
                  <button type="button" className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-primary-300">
                    <ThumbsUpIcon size={14} weight="regular" /> Helpful ({r.helpful})
                  </button>
                  <span className="text-slate-700">·</span>
                  <span>Verified patient review</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== CLOSING CTA */}
      <section className="relative w-full px-6 pb-24 sm:px-10 lg:px-16">
        <div className="rv relative mx-auto w-full max-w-7xl overflow-hidden rounded-[var(--radius-surface)] bg-brand-gradient p-8 shadow-lg shadow-primary-500/20 sm:p-12">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} size={16} weight="fill" className="text-white" />
                ))}
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                Share your Mātru story.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
                Your experience helps another family choose care with confidence.
                Leave a written or video review — it only takes a minute.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#leave-review" className="group inline-flex items-center gap-3 bg-white py-2.5 pl-5 pr-2.5 text-sm font-semibold text-primary-700 shadow-md transition-all duration-300 hover:bg-primary-50">
                Write a review
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-200 bg-primary-100 text-primary-700 transition-colors duration-300 group-hover:bg-primary-200">
                  <ArrowUpRightIcon size={16} weight="bold" />
                </span>
              </a>
              <a href="#book-appointment" className="inline-flex items-center gap-2 border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10">
                Book appointment
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
