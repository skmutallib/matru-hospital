"use client";

import Link from "next/link";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarBlankIcon,
  BookOpenTextIcon,
} from "@phosphor-icons/react/dist/ssr";
import { POSTS, type Post } from "../journal/data";

function CoverArt({ art, category }: { art: string; category: string }) {
  return (
    <span
      aria-hidden="true"
      className="blog-cover pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: art }}
    >
      {/* soft light sweep that drifts on hover */}
      <span className="blog-sheen pointer-events-none absolute inset-0" />
      {/* fine grid texture for a premium print feel */}
      <span
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* darkening at the base so text sits cleanly */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
        <span className="h-1 w-1 rounded-full bg-white" />
        {category}
      </span>
    </span>
  );
}

function Byline({ post, tone = "muted" }: { post: Post; tone?: "muted" | "light" }) {
  const initials = post.author
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-primary-500/30 to-secondary-500/20 text-[11px] font-bold text-white">
        {initials}
      </span>
      <div className="leading-tight">
        <p
          className={`text-[13px] font-semibold ${
            tone === "light" ? "text-white" : "text-slate-200"
          }`}
        >
          {post.author}
        </p>
        <p className="text-[11px] text-slate-400">{post.role}</p>
      </div>
    </div>
  );
}

export default function BlogSection() {
  const [featured, ...rest] = POSTS;

  return (
    <section className="blog-scope relative w-full overflow-hidden px-6 pb-32 pt-8 sm:px-10 lg:px-16">
      <style>{`
        .blog-scope .blog-card { will-change: transform; }
        .blog-scope .blog-card:hover { transform: translateY(-6px); }
        .blog-scope .blog-cover .blog-sheen {
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .blog-scope .blog-card:hover .blog-sheen { transform: translateX(120%); }
        .blog-scope .blog-card .blog-img { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease; }
        .blog-scope .blog-card:hover .blog-img { transform: scale(1.06); filter: saturate(1.15) brightness(1.05); }
        .blog-scope .blog-title-link { background-image: linear-gradient(var(--color-primary-500), var(--color-primary-500)); background-size: 0% 2px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size 0.5s cubic-bezier(0.16,1,0.3,1); }
        .blog-scope .blog-card:hover .blog-title-link { background-size: 100% 2px; }
        .blog-scope .blog-arrow { transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s, color 0.3s; }
        .blog-scope .blog-card:hover .blog-arrow { transform: translate(3px,-3px); }
        .blog-scope .blog-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.5s; }
        @media (prefers-reduced-motion: reduce) {
          .blog-scope .blog-card, .blog-scope .blog-sheen, .blog-scope .blog-img,
          .blog-scope .blog-title-link, .blog-scope .blog-arrow { transition: none; }
          .blog-scope .blog-card:hover { transform: none; }
        }
      `}</style>

      {/* ambient brand glows */}
      <div
        className="animate-hero-float pointer-events-none absolute -left-40 top-24 h-[30rem] w-[30rem] rounded-full bg-secondary-500/10 blur-[160px]"
        aria-hidden="true"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="animate-hero-float pointer-events-none absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-primary-500/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* hairline divider from the grid above */}
        <div
          className="mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent"
          aria-hidden="true"
        />

        {/* ===== Section header ===== */}
        <div
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/15 text-primary-300">
                <BookOpenTextIcon size={13} weight="fill" />
              </span>
              From the Journal
            </div>
            <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Insights from our
              <span className="block text-primary-500">doctors & clinicians.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              Considered, evidence-led writing from the specialists at Mātru —
              on prevention, recovery, and living well between visits.
            </p>
          </div>

          <Link
            href="/journal"
            className="blog-card group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-primary-500/50 hover:bg-primary-500/10"
          >
            Read the journal
            <span className="blog-arrow flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white">
              <ArrowRightIcon size={15} weight="bold" />
            </span>
          </Link>
        </div>

        {/* ===== Featured + list ===== */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Featured */}
          <Link
            href={`/journal/${featured.id}`}
            data-reveal
            aria-label={featured.title}
            className="blog-card group relative flex flex-col overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] hover:border-primary-500/40 hover:shadow-[0_36px_80px_-30px_rgba(245,131,37,0.25)] focus-visible:outline-none lg:col-span-7"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
              <span className="blog-img absolute inset-0">
                <CoverArt art={featured.art} category={featured.category} />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlankIcon size={13} weight="bold" />
                  {featured.date}
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon size={13} weight="bold" />
                  {featured.readMins} min read
                </span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight text-white sm:text-[2rem]">
                <span className="blog-title-link">{featured.title}</span>
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
                {featured.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between pt-8">
                <Byline post={featured} tone="light" />
                <span className="blog-arrow flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-200 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                  <ArrowUpRightIcon size={19} weight="bold" />
                </span>
              </div>
            </div>
          </Link>

          {/* Compact list */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.id}`}
                data-reveal
                aria-label={post.title}
                className="blog-card group relative flex gap-4 overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] hover:border-primary-500/40 hover:shadow-[0_28px_60px_-30px_rgba(245,131,37,0.22)] focus-visible:outline-none sm:p-5"
              >
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
                  <span className="blog-img absolute inset-0">
                    <CoverArt art={post.art} category={post.category} />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <span>{post.date}</span>
                    <span className="h-2.5 w-px bg-white/15" />
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon size={11} weight="bold" />
                      {post.readMins} min
                    </span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-[17px] font-bold leading-snug tracking-tight text-white">
                    <span className="blog-title-link">{post.title}</span>
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <p className="truncate text-[11px] font-medium text-slate-400">
                      {post.author}
                      <span className="text-slate-600"> · {post.role}</span>
                    </p>
                    <span className="blog-arrow flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                      <ArrowUpRightIcon size={14} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
