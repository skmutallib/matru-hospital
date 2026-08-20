"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarBlankIcon,
  QuotesIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getPost, relatedPosts, type Post, type BlogBlock } from "../data";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

/* Scroll-linked reading progress bar pinned to the top of the viewport. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function Cover({ art, category }: { art: string; category: string }) {
  return (
    <span
      aria-hidden="true"
      className="art-cover pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: art }}
    >
      <span className="art-sheen pointer-events-none absolute inset-0" />
      <span
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
        <span className="h-1 w-1 rounded-full bg-white" />
        {category}
      </span>
    </span>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          data-reveal
          className="mt-14 flex items-center gap-4 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          <span className="h-6 w-1.5 shrink-0 rounded-full bg-primary-500" />
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <figure
          data-reveal
          className="relative my-12 overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-br from-primary-500/[0.08] to-secondary-500/[0.05] p-8 sm:p-10"
        >
          <QuotesIcon
            size={54}
            weight="fill"
            className="absolute -right-1 -top-1 text-primary-500/15"
          />
          <blockquote className="relative font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-white sm:text-2xl">
            “{block.text}”
          </blockquote>
          {block.cite && (
            <figcaption className="relative mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-300">
              — {block.cite}
            </figcaption>
          )}
        </figure>
      );
    case "list":
      return (
        <ul data-reveal className="my-8 space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500 ring-4 ring-primary-500/15" />
              <span className="text-[16.5px] leading-relaxed text-slate-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p
          data-reveal
          className="mt-6 text-[16.5px] leading-[1.85] text-slate-300 first:mt-0"
        >
          {block.text}
        </p>
      );
  }
}

export default function ArticleContent({ slug }: { slug: string }) {
  const post = getPost(slug);
  const related = relatedPosts(slug);
  const articleRef = useRef<HTMLDivElement>(null);
  const [shared, setShared] = useState(false);

  if (!post) return null;

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });
        return;
      }
      await navigator.clipboard?.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      /* user dismissed — no-op */
    }
  };

  return (
    <div className="article-scope relative min-h-screen overflow-x-clip bg-[#0a0b0d]">
      <style>{`
        .article-scope .art-cover .art-sheen {
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .article-scope .art-hero:hover .art-sheen { transform: translateX(120%); }
        .article-scope .rel-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.5s; }
        .article-scope .rel-card:hover { transform: translateY(-6px); }
        .article-scope .rel-card .rel-img { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease; }
        .article-scope .rel-card:hover .rel-img { transform: scale(1.07); filter: saturate(1.15) brightness(1.05); }
        .article-scope .rel-card .rel-sheen {
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.32) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .article-scope .rel-card:hover .rel-sheen { transform: translateX(120%); }
        .article-scope .rel-card .rel-title { background-image: linear-gradient(var(--color-primary-500), var(--color-primary-500)); background-size: 0% 2px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size 0.5s cubic-bezier(0.16,1,0.3,1); }
        .article-scope .rel-card:hover .rel-title { background-size: 100% 2px; }
        .article-scope .rel-card .rel-arrow, .article-scope .tag-chip { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s, color 0.3s; }
        .article-scope .rel-card:hover .rel-arrow { transform: translate(3px,-3px); }
        .article-scope .drop-cap:first-letter {
          float: left; font-family: var(--font-display); font-weight: 800;
          font-size: 3.6rem; line-height: 0.82; padding: 0.35rem 0.7rem 0 0;
          color: var(--color-primary-500);
        }
        @media (prefers-reduced-motion: reduce) {
          .article-scope .art-sheen, .article-scope .rel-card, .article-scope .rel-img,
          .article-scope .rel-sheen, .article-scope .rel-title, .article-scope .rel-arrow { transition: none; }
          .article-scope .rel-card:hover { transform: none; }
        }
      `}</style>

      <ReadingProgress />

      {/* ambient brand glows */}
      <div
        className="animate-hero-float pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-primary-500/12 blur-[170px]"
        aria-hidden="true"
      />
      <div
        className="animate-hero-float pointer-events-none absolute -left-40 top-64 h-[28rem] w-[28rem] rounded-full bg-secondary-500/10 blur-[160px]"
        aria-hidden="true"
        style={{ animationDelay: "-6s" }}
      />

      {/* ===== Header ===== */}
      <section className="relative w-full px-6 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <Link
              href="/journal"
              className="group inline-flex items-center gap-2 text-slate-400 transition-colors duration-300 hover:text-primary-400"
            >
              <ArrowLeftIcon
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              The Journal
            </Link>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-primary-300">{post.category}</span>
          </div>

          <h1 className="animate-hero-rise mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            {post.title}
          </h1>
          <p className="animate-hero-rise mt-6 text-lg leading-relaxed text-slate-400 [animation-delay:0.08s]">
            {post.excerpt}
          </p>

          {/* byline */}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-primary-500/30 to-secondary-500/20 text-sm font-bold text-white">
                {initials(post.author)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-slate-400">{post.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlankIcon size={13} weight="bold" />
                {post.date}
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon size={13} weight="bold" />
                {post.readMins} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Cover banner ===== */}
      <section className="relative w-full px-6 pt-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="art-hero relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-surface)] border border-white/10 shadow-[0_40px_90px_-40px_rgba(245,131,37,0.35)] sm:aspect-[2/1]">
            <Cover art={post.art} category={post.category} />
          </div>
        </div>
      </section>

      {/* ===== Article body ===== */}
      <section className="relative w-full px-6 py-16 sm:px-10 lg:px-16">
        <div ref={articleRef} className="mx-auto w-full max-w-3xl">
          {post.body.map((block, i) =>
            i === 0 && block.type === "para" ? (
              <p
                key={i}
                data-reveal
                className="drop-cap text-[17.5px] leading-[1.85] text-slate-200"
              >
                {block.text}
              </p>
            ) : (
              <Block key={i} block={block} />
            ),
          )}

          {/* tags + share */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-chip cursor-default rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-slate-300 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={onShare}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-primary-500/50 hover:bg-primary-500/10"
            >
              <ShareNetworkIcon size={16} weight="bold" />
              {shared ? "Link copied" : "Share"}
            </button>
          </div>

          {/* author card */}
          <div
            data-reveal
            className="mt-10 flex flex-col gap-5 rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 sm:flex-row sm:items-center"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-primary-500/40 to-secondary-500/25 text-lg font-bold text-white">
              {initials(post.author)}
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-300">
                Written by
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold text-white">
                {post.author}
              </p>
              <p className="text-sm text-slate-400">
                {post.role} · Mātru Multispeciality Hospital
              </p>
            </div>
            <Link
              href="/departments"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-primary-500/50 hover:bg-primary-500/10 sm:self-auto"
            >
              View department
              <ArrowUpRightIcon
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Continue reading ===== */}
      {related.length > 0 && (
        <section className="relative w-full px-6 pb-28 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <div
              className="mb-10 flex items-end justify-between"
              data-reveal
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Continue reading
              </h2>
              <Link
                href="/journal"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition-colors hover:text-primary-200"
              >
                All articles
                <ArrowRightIcon
                  size={14}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((rp: Post) => (
                <Link
                  key={rp.id}
                  href={`/journal/${rp.id}`}
                  data-reveal
                  aria-label={rp.title}
                  className="rel-card group relative flex flex-col overflow-hidden rounded-[var(--radius-surface)] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] hover:border-primary-500/40 hover:shadow-[0_28px_60px_-30px_rgba(245,131,37,0.22)] focus-visible:outline-none"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <span className="rel-img absolute inset-0">
                      <Cover art={rp.art} category={rp.category} />
                    </span>
                    <span className="rel-sheen pointer-events-none absolute inset-0 z-10" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      <ClockIcon size={11} weight="bold" />
                      {rp.readMins} min read
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[16px] font-bold leading-snug tracking-tight text-white">
                      <span className="rel-title">{rp.title}</span>
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="truncate text-[11px] font-medium text-slate-400">
                        {rp.author}
                      </span>
                      <span className="rel-arrow flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                        <ArrowUpRightIcon size={13} weight="bold" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
