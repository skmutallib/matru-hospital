"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  // Premium reveal: a cinematic "curtain" opens on first view, and the whole
  // film scales up + settles into place as you scroll toward it (Apple-style).
  useEffect(() => {
    const frame = frameRef.current;
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!frame || !wrapper) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // First-view curtain reveal.
      gsap.set(frame, {
        clipPath: "inset(0% 50% 0% 50% round 2rem)",
        opacity: 0,
      });
      if (video) gsap.set(video, { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top 82%", once: true },
      });
      tl.to(frame, { opacity: 1, duration: 0.4, ease: "none" }, 0)
        .to(
          frame,
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            duration: 1.5,
            ease: "power4.inOut",
          },
          0
        );
      if (video) {
        tl.to(video, { scale: 1, duration: 2.4, ease: "power3.out" }, 0);
      }

      // Scroll-scrubbed scale: the film expands into place as the section
      // rises toward the middle of the viewport, then holds.
      gsap.fromTo(
        wrapper,
        { scale: 0.88, yPercent: 6 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 92%",
            end: "top 38%",
            scrub: 1,
          },
        }
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0b0d] py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-4 sm:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-300"
          >
            Our Story
          </span>
          <h2
            data-reveal
            className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Where every heartbeat matters
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 lg:text-lg"
          >
            Step inside Mātru Multispeciality Hospital — where advanced medicine
            meets human warmth. Watch the film that captures our promise.
          </p>
        </div>

        {/* Video */}
        <div
          ref={wrapperRef}
          className="relative mx-auto mt-14 w-full max-w-none will-change-transform"
        >
          <div
            ref={frameRef}
            className="group relative z-10 overflow-hidden rounded-[2rem] ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] will-change-transform"
          >
          <video
            ref={videoRef}
            className="aspect-video w-full cursor-pointer object-cover"
            src="/brandfilm.webm"
            poster="/hero-nightview.jpg"
            autoPlay
            loop
            muted
            playsInline
            onClick={togglePlay}
          />

          {/* Edge vignette */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/40 via-transparent to-black/10"
            aria-hidden="true"
          />

          {/* Play/pause overlay (shown when paused) */}
          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play brand film"
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/90 text-white shadow-lg shadow-primary-500/40 transition-transform duration-300 hover:scale-105">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {/* Controls bar */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            >
              {muted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M11 5 6 9H2v6h4l5 4z" />
                  <path d="m23 9-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M11 5 6 9H2v6h4l5 4z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
