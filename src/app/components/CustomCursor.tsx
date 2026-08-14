"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide luxury cursor: a single hairline ring — no fill, no dot — that
 * glides after the pointer with a soft spring and uses `mix-blend-mode:
 * difference`, so it stays visible by inverting against whatever is behind it
 * (dark hero, lighter panels, imagery, or the orange headings alike). The ring
 * expands gently over interactive elements and dips on press.
 *
 * Desktop (fine pointer) only — touch devices keep the native cursor — and it
 * follows instantly under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desktop pointers only — touch devices keep the native cursor and the
    // (invisible, inert) element below simply does nothing.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    if (!ring) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.16;

    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const state = { x: mouse.x, y: mouse.y, s: 1 };
    let hovering = false;
    let down = false;
    let visible = false;
    let raf = 0;

    const desiredScale = () => (hovering ? 2.3 : 1) * (down ? 0.85 : 1);

    const loop = () => {
      state.x += (mouse.x - state.x) * ease;
      state.y += (mouse.y - state.y) * ease;
      state.s += (desiredScale() - state.s) * ease;
      ring.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.s})`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
      }
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

        .mtr-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          height: 32px;
          width: 32px;
          border-radius: 9999px;
          border: 1.25px solid #ffffff;
          background: transparent;
          mix-blend-mode: difference;
          pointer-events: none;
          opacity: 0;
          transition: border-width 0.3s ease;
          will-change: transform;
        }
        .mtr-cursor-ring.is-hover {
          border-width: 1px;
        }
      `}</style>
      <div ref={ringRef} className="mtr-cursor-ring" aria-hidden="true" />
    </>
  );
}
