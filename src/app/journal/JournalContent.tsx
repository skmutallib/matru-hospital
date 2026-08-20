"use client";

import Link from "next/link";
import {
  ArrowUpRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  CalendarBlankIcon,
  BookOpenTextIcon,
} from "@phosphor-icons/react/dist/ssr";
import { POSTS, type Post } from "./data";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function Cover({ art, category }: { art: string; category: string }) {
  return (
    <span
      aria-hidden="true"
      className="jr-cover pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: art }}
    >
      <span className="jr-sheen pointer-events-none absolute inset-0 z-10" />
      <span
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
        <span className="h-1 w-1 rounded-full bg-white" />
        {category}
      </span>
    </span>
  );
}

export default function JournalContent() {
  return (
    <div className="jr-scope relative min-h-screen overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .jr-scope .jr-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.5s; }
        .jr-scope .jr-card:hover { transform: translateY(-6px); }
        .jr-scope .jr-card .jr-img { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease; }
        .jr-scope .jr-card:hover .jr-img { transform: scale(1.06); filter: saturate(1.15) brightness(1.05); }
        .jr-scope .jr-card .jr-sheen {
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.32) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .jr-scope .jr-card:hover .jr-sheen { transform: translateX(120%); }
        .jr-scope .jr-card .jr-title { background-image: linear-gradient(var(--color-primary-500), var(--color-primary-500)); background-size: 0% 2px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size 0.5s cubic-bezier(0.16,1,0.3,1); }
        .jr-scope .jr-card:hover .jr-title { background-size: 100% 2px; }
        .jr-scope .jr-card .jr-arrow { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s, color 0.3s; }
        .jr-scope .jr-card:hover .jr-arrow { transform: translate(3px,-3px); }
        @media (prefers-reduced-motion: reduce) {
          .jr-scope .jr-card, .jr-scope .jr-img, .jr-scope .jr-sheen, .jr-scope .jr-title, .jr-scope .jr-arrow { transition: none; }
          .jr-scope .jr-card:hover { transform: none; }
        }
      `}</style>

      {/* ambient glows */}
      <div
        className="animate-hero-float pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-primary-500/12 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="animate-hero-float pointer-events-none absolute -left-40 top-44 h-[26rem] w-[26rem] rounded-full bg-secondary-500/10 blur-[150px]"
        aria-hidden="true"
        style={{ animationDelay: "-6s" }}
      />

      {/* ===== Masthead ===== */}
      <section className="relative w-full px-6 pb-14 pt-36 sm:px-10 sm:pt-44 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Link
            href="/departments"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 transition-colors duration-300 hover:text-primary-400"
          >
            <ArrowLeftIcon
              size={15}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Departments
          </Link>

          <div className="mt-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/15 text-primary-300">
              <BookOpenTextIcon size={13} weight="fill" />
            </span>
            The Mātru Journal
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl">
              Writing from
              <span className="block text-primary-500">our clinicians.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-slate-400 lg:pb-3">
              Evidence-led perspectives on prevention, recovery, and everyday
              wellbeing — written by the doctors and specialists who practise at
              Mātru.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="relative w-full px-6 pb-32 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post: Post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              data-reveal
              aria-label={post.title}
              className="jr-card group relative flex flex-col overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] hover:border-primary-500/40 hover:shadow-[0_28px_60px_-30px_rgba(245,131,37,0.22)] focus-visible:outline-none"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <span className="jr-img absolute inset-0">
                  <Cover art={post.art} category={post.category} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarBlankIcon size={12} weight="bold" />
                    {post.date}
                  </span>
                  <span className="h-2.5 w-px bg-white/15" />
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon size={12} weight="bold" />
                    {post.readMins} min
                  </span>
                </div>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight text-white">
                  <span className="jr-title">{post.title}</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-primary-500/30 to-secondary-500/20 text-[10px] font-bold text-white">
                      {initials(post.author)}
                    </span>
                    <div className="leading-tight">
                      <p className="text-[12px] font-semibold text-slate-200">
                        {post.author}
                      </p>
                      <p className="text-[10px] text-slate-500">{post.role}</p>
                    </div>
                  </div>
                  <span className="jr-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                    <ArrowUpRightIcon size={15} weight="bold" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
