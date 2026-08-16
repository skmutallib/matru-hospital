"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide luxury cursor — a two-part brand pointer:
 *
 *   • a small solid **dot** in Cadmium Orange that leads, tracking the pointer
 *     almost 1:1, wrapped in a soft luminous glow, and
 *   • a larger orange outline **ring** that trails behind with a gentle spring.
 *
 * At rest the ring settles concentrically around the dot (a refined target).
 * Over interactive elements the ring blooms and fills with a faint orange wash
 * so the cursor haloes the thing you're about to click. Both parts carry a soft
 * orange glow for a premium, jewel-like feel on the dark pages and the light
 * detail page alike.
 *
 * Desktop (fine pointer) only — touch devices keep the native cursor — and it
 * snaps 1:1 under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dotEase = reduce ? 1 : 0.55; // dot keeps up tightly
    const ringEase = reduce ? 1 : 0.2; // ring trails with a spring
    const scaleEase = reduce ? 1 : 0.3;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotState = { x: mouse.x, y: mouse.y, s: 1 };
    const ringState = { x: mouse.x, y: mouse.y, s: 1 };
    let hovering = false;
    let down = false;
    let visible = false;
    let raf = 0;

    const ringScale = () => (hovering ? 1.85 : 1) * (down ? 0.82 : 1);
    const dotScale = () => (hovering ? 0.55 : 1) * (down ? 0.7 : 1);

    const loop = () => {
      dotState.x += (mouse.x - dotState.x) * dotEase;
      dotState.y += (mouse.y - dotState.y) * dotEase;
      dotState.s += (dotScale() - dotState.s) * scaleEase;
      dot.style.transform = `translate3d(${dotState.x}px, ${dotState.y}px, 0) translate(-50%, -50%) scale(${dotState.s})`;

      ringState.x += (mouse.x - ringState.x) * ringEase;
      ringState.y += (mouse.y - ringState.y) * ringEase;
      ringState.s += (ringScale() - ringState.s) * scaleEase;
      ring.style.transform = `translate3d(${ringState.x}px, ${ringState.y}px, 0) translate(-50%, -50%) scale(${ringState.s})`;

      raf = requestAnimationFrame(loop);
    };

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      show();
    };

    const interactiveSel =
      "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='hover']";
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isInteractive = !!(target && target.closest && target.closest(interactiveSel));
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.classList.toggle("is-hover", hovering);
      }
    };
    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <style>{`
        html.has-custom-cursor,
        html.has-custom-cursor * { cursor: none !important; }

        .mtr-cursor-dot,
        .mtr-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 9999px;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
        }

        /* Leading dot — orange core with a soft luminous glow */
        .mtr-cursor-dot {
          z-index: 10000;
          height: 7px;
          width: 7px;
          background: #f58325;
          box-shadow:
            0 0 10px 2px rgba(245, 131, 37, 0.55),
            0 0 22px 4px rgba(245, 131, 37, 0.28);
          transition: opacity 0.25s ease;
        }

        /* Trailing ring — orange hairline with a subtle halo */
        .mtr-cursor-ring {
          z-index: 9999;
          height: 36px;
          width: 36px;
          border: 1.5px solid rgba(245, 131, 37, 0.9);
          background: transparent;
          box-shadow:
            0 0 16px 1px rgba(245, 131, 37, 0.25),
            inset 0 0 10px 0 rgba(245, 131, 37, 0.12);
          transition: opacity 0.3s ease, background-color 0.35s ease,
            border-color 0.35s ease;
        }
        .mtr-cursor-ring.is-hover {
          border-color: rgba(250, 138, 69, 1);
          background: rgba(245, 131, 37, 0.1);
        }
      `}</style>
      <div ref={ringRef} className="mtr-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="mtr-cursor-dot" aria-hidden="true" />
    </>
  );
}
