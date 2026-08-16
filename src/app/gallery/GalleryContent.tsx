"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ImageSquareIcon,
  CameraIcon,
  MagnifyingGlassPlusIcon,
  ArrowsOutSimpleIcon,
  XIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ApertureIcon,
} from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";

/* ============================================================ demo photo data
   NOTE: these are DEMO placeholders (duotone posters). To use a real photo,
   give an item a `src` and the tile renders <img> instead of the gradient. */

type Item = {
  id: string;
  title: string;
  category: string;
  grad: string;
  /** grid footprint on lg (bento mosaic) */
  span: string;
  /** intrinsic aspect for the lightbox frame */
  ratio: string;
  src?: string;
};

const CATEGORIES = [
  "All",
  "Facilities",
  "Surgery",
  "Maternity",
  "Emergency",
  "Technology",
  "Community",
] as const;

const ITEMS: Item[] = [
  { id: "g1", title: "The Main Atrium", category: "Facilities", grad: "from-primary-500/40 via-primary-700/25 to-[#0b0c0e]", span: "lg:col-span-2 lg:row-span-2", ratio: "4/3" },
  { id: "g2", title: "Operating Theatre 3", category: "Surgery", grad: "from-secondary-500/40 via-secondary-700/25 to-[#0b0c0e]", span: "", ratio: "1/1" },
  { id: "g3", title: "Neonatal ICU", category: "Maternity", grad: "from-primary-400/35 via-primary-600/25 to-[#0b0c0e]", span: "lg:row-span-2", ratio: "3/4" },
  { id: "g4", title: "Emergency Bay", category: "Emergency", grad: "from-primary-500/45 via-[#3a1c0c] to-[#0b0c0e]", span: "", ratio: "1/1" },
  { id: "g5", title: "3D Imaging Suite", category: "Technology", grad: "from-secondary-400/40 via-secondary-800/30 to-[#0b0c0e]", span: "lg:col-span-2", ratio: "16/9" },
  { id: "g6", title: "Private Recovery Room", category: "Facilities", grad: "from-primary-400/30 via-primary-700/25 to-[#0b0c0e]", span: "", ratio: "1/1" },
  { id: "g7", title: "Robotic Surgery Console", category: "Technology", grad: "from-secondary-500/45 via-[#0c2b2c] to-[#0b0c0e]", span: "lg:row-span-2", ratio: "3/4" },
  { id: "g8", title: "Maternity Wing", category: "Maternity", grad: "from-primary-500/35 via-primary-600/25 to-[#0b0c0e]", span: "", ratio: "1/1" },
  { id: "g9", title: "Health Camp, 2025", category: "Community", grad: "from-secondary-400/35 via-secondary-700/25 to-[#0b0c0e]", span: "lg:col-span-2", ratio: "16/9" },
  { id: "g10", title: "Pharmacy & Dispensary", category: "Facilities", grad: "from-primary-400/35 via-primary-700/25 to-[#0b0c0e]", span: "", ratio: "1/1" },
  { id: "g11", title: "Trauma Response Team", category: "Emergency", grad: "from-primary-500/45 via-[#3a1c0c] to-[#0b0c0e]", span: "", ratio: "1/1" },
  { id: "g12", title: "Reception & Lounge", category: "Facilities", grad: "from-secondary-400/30 via-[#0c2b2c] to-[#0b0c0e]", span: "", ratio: "1/1" },
];

const COLLECTIONS = [
  { name: "Facilities", count: 24, grad: "from-primary-500/50 to-[#0b0c0e]" },
  { name: "Surgical Suites", count: 18, grad: "from-secondary-500/50 to-[#0b0c0e]" },
  { name: "Maternity & NICU", count: 21, grad: "from-primary-400/50 to-[#0b0c0e]" },
  { name: "Technology", count: 15, grad: "from-secondary-400/50 to-[#0b0c0e]" },
  { name: "Community & Events", count: 30, grad: "from-primary-500/45 to-[#0b0c0e]" },
];

/* ------------------------------------------------------------------ helpers */

const GRAIN =
  "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)";

/** The duotone poster placeholder (or a real <img> when `src` is set). */
function Poster({ item, className = "" }: { item: Item; className?: string }) {
  if (item.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.src} alt={item.title} className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 bg-gradient-to-br ${item.grad}`} />
      <div className="absolute inset-0 opacity-[0.55] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "16px 16px" }} />
      <ApertureIcon size={64} weight="thin" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/12" />
    </div>
  );
}

/* ----------------------------------------------------------------- component */

export default function GalleryContent() {
  const root = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(() => (cat === "All" ? ITEMS : ITEMS.filter((i) => i.category === cat)), [cat]);

  /* ---- Reveal on scroll ---- */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>(".rv"));
    if (reduce) {
      rvs.forEach((n) => n.classList.add("in"));
      return;
    }
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    rvs.forEach((n) => (n.getBoundingClientRect().top < vh * 0.92 ? n.classList.add("in") : io.observe(n)));
    return () => io.disconnect();
  }, []);

  /* ---- Cursor-following collection preview ---- */
  const previewRef = useRef<HTMLDivElement>(null);
  const previewSetters = useRef<{ x?: (v: number) => void; y?: (v: number) => void }>({});
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const p = previewRef.current;
    if (!p) return;
    if (window.matchMedia("(pointer: fine)").matches) {
      previewSetters.current.x = gsap.quickTo(p, "x", { duration: 0.7, ease: "power3" });
      previewSetters.current.y = gsap.quickTo(p, "y", { duration: 0.7, ease: "power3" });
    }
  }, []);

  const onListMove = useCallback((e: React.MouseEvent) => {
    previewSetters.current.x?.(e.clientX);
    previewSetters.current.y?.(e.clientY);
  }, []);

  /* ---- Lightbox controls ---- */
  const closeBox = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (d: number) => setLightbox((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [lightbox, closeBox, step]);

  const active = lightbox !== null ? visible[lightbox] : null;

  return (
    <div ref={root} className="gal relative overflow-x-clip bg-[#08090b] text-slate-200">
      <style>{`
        .gal .rv { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .gal .rv.in { opacity: 1; transform: none; }

        @keyframes g-in { from { opacity: 0; transform: translateY(26px) scale(.97); } to { opacity: 1; transform: none; } }
        .gal .g-in { animation: g-in .75s cubic-bezier(.16,1,.3,1) both; }

        /* Poster hover: duotone → brighter, zoom */
        .gal .tile .ph { filter: saturate(.55) brightness(.82) contrast(1.05); transition: transform .8s cubic-bezier(.16,1,.3,1), filter .6s ease; }
        .gal .tile:hover .ph { transform: scale(1.09); filter: saturate(1.05) brightness(1.02) contrast(1); }
        .gal .tile .cap { transform: translateY(115%); transition: transform .55s cubic-bezier(.16,1,.3,1); }
        .gal .tile:hover .cap { transform: translateY(0); }
        .gal .tile .view { opacity: 0; transform: scale(.8); transition: opacity .4s ease, transform .5s cubic-bezier(.16,1,.3,1); }
        .gal .tile:hover .view { opacity: 1; transform: scale(1); }

        @keyframes gal-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gal .film { display: flex; width: max-content; animation: gal-marquee 48s linear infinite; }
        .gal .film-wrap:hover .film { animation-play-state: paused; }

        .gal .collrow .coll-idx { color: rgba(255,255,255,.25); transition: color .4s ease, transform .5s cubic-bezier(.16,1,.3,1); }
        .gal .collrow:hover .coll-name { color: #fff; transform: translateX(10px); }
        .gal .coll-name { transition: color .4s ease, transform .5s cubic-bezier(.16,1,.3,1); }
        .gal .collrow:hover .coll-idx { color: rgb(245,131,37); }

        @media (prefers-reduced-motion: reduce) {
          .gal .rv { opacity: 1 !important; transform: none !important; }
          .gal .g-in { animation: none !important; }
          .gal .film { animation: none !important; }
        }
      `}</style>

      {/* ============================================================ HERO */}
      <section className="relative w-full overflow-hidden px-6 pb-10 pt-36 sm:px-10 sm:pt-44 lg:px-16">
        <div className="animate-hero-float pointer-events-none absolute -right-40 top-8 h-[34rem] w-[34rem] rounded-full bg-primary-500/12 blur-[170px]" aria-hidden="true" />
        <div className="animate-hero-float pointer-events-none absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full bg-secondary-500/10 blur-[160px]" aria-hidden="true" style={{ animationDelay: "-6s" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="rv flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            The Mātru Lens
            <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden items-center gap-2 text-slate-500 sm:flex">
              <CameraIcon size={14} weight="duotone" /> {ITEMS.length} frames
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <h1 className="rv font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              Moments
              <span className="block text-primary-500">of care.</span>
            </h1>
            <p className="rv max-w-md text-base leading-relaxed text-slate-400 lg:pb-3">
              A visual journal from inside Mātru — the spaces, the technology, and
              the people behind four decades of trusted care. Hover to explore,
              click to open.
            </p>
          </div>

          {/* filter chips */}
          <div className="rv mt-12 flex flex-wrap gap-2.5 border-t border-white/10 pt-8">
            {CATEGORIES.map((c) => {
              const on = c === cat;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                    on
                      ? "border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/25"
                      : "border-white/12 bg-white/[0.03] text-slate-300 hover:border-primary-500/40 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= MOSAIC GRID */}
      <section className="relative w-full px-6 pb-24 pt-10 sm:px-10 lg:px-16">
        <div
          key={cat}
          className="mx-auto grid w-full max-w-7xl auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4"
        >
          {visible.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightbox(i)}
              style={{ animationDelay: `${Math.min(i, 10) * 0.06}s` }}
              className={`tile g-in group relative overflow-hidden rounded-[var(--radius-surface)] border border-white/10 text-left transition-colors duration-500 hover:border-primary-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${item.span}`}
              aria-label={`Open ${item.title}`}
            >
              <Poster item={item} className="ph" />
              {/* legibility gradient */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" aria-hidden="true" />

              {/* category chip */}
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
                {item.category}
              </span>
              {/* view affordance */}
              <span className="view absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm">
                <MagnifyingGlassPlusIcon size={16} weight="bold" />
              </span>

              {/* caption slides up */}
              <div className="cap absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2">
                  <ImageSquareIcon size={15} weight="duotone" className="text-primary-400" />
                  <span className="font-[family-name:var(--font-display)] text-base font-bold text-white">{item.title}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================== FILM-STRIP MARQUEE */}
      <section className="film-wrap relative w-full overflow-hidden border-y border-white/10 py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#08090b] to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#08090b] to-transparent" aria-hidden="true" />
        <div className="film gap-4 px-2">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10">
              <Poster item={item} />
              <span className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== CURSOR-FOLLOW COLLECTIONS */}
      <section className="relative w-full px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rv flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Curated Collections
            <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            <span className="hidden text-slate-500 sm:block">Hover to preview</span>
          </div>

          <div className="mt-8 border-t border-white/10" onMouseMove={onListMove}>
            {COLLECTIONS.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                onClick={() => {
                  const idx = ITEMS.findIndex((it) => it.category.startsWith(c.name.split(" ")[0]));
                  setCat("All");
                  setLightbox(idx >= 0 ? idx : 0);
                }}
                className="collrow group flex w-full items-center justify-between border-b border-white/10 py-7 text-left transition-colors duration-300 sm:py-9"
              >
                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span className="coll-idx font-[family-name:var(--font-display)] text-sm font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="coll-name font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-300 sm:text-5xl">
                    {c.name}
                  </span>
                </div>
                <span className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {c.count} photos
                  <ArrowsOutSimpleIcon size={18} className="transition-transform duration-300 group-hover:rotate-45 group-hover:text-primary-300" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* floating cursor preview */}
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/15 shadow-2xl transition-opacity duration-300 lg:block"
          style={{ opacity: hovered !== null ? 1 : 0 }}
        >
          {hovered !== null && (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${COLLECTIONS[hovered].grad}`} />
              <div className="absolute inset-0 opacity-[0.5] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "14px 14px" }} />
              <ApertureIcon size={48} weight="thin" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-sm font-bold text-white">{COLLECTIONS[hovered].name}</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* =========================================================== CLOSING CTA */}
      <section className="relative w-full px-6 pb-24 sm:px-10 lg:px-16">
        <div className="rv relative mx-auto w-full max-w-7xl overflow-hidden rounded-[var(--radius-surface)] border border-white/12 bg-white/[0.02] p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/12 blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary-500/12 blur-[120px]" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-300">
                <CameraIcon size={14} weight="duotone" /> See it in person
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                Step inside Mātru.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                Photos tell part of the story — experience our care first-hand.
                Book a visit or a consultation with our team.
              </p>
            </div>
            <a href="#book-appointment" className="group inline-flex items-center gap-3 bg-primary-500 py-3 pl-6 pr-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-colors duration-300 hover:bg-primary-600">
              Book a visit
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                <CaretRightIcon size={16} weight="bold" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =============================================================== LIGHTBOX */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          onClick={closeBox}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          {/* close */}
          <button
            type="button"
            onClick={closeBox}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/10"
            aria-label="Close"
          >
            <XIcon size={18} weight="bold" />
          </button>

          {/* prev / next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-primary-500/60 hover:bg-white/10 sm:left-8"
            aria-label="Previous"
          >
            <CaretLeftIcon size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-primary-500/60 hover:bg-white/10 sm:right-8"
            aria-label="Next"
          >
            <CaretRightIcon size={20} weight="bold" />
          </button>

          {/* frame */}
          <figure
            className="relative w-full max-w-4xl overflow-hidden rounded-[var(--radius-surface)] border border-white/15 shadow-2xl"
            style={{ aspectRatio: active.ratio }}
            onClick={(e) => e.stopPropagation()}
          >
            <Poster item={active} />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">{active.category}</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">{active.title}</div>
              </div>
              <div className="text-xs font-semibold tabular-nums text-white/60">
                {(lightbox ?? 0) + 1} / {visible.length}
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
