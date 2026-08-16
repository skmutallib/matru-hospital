"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Pointer-driven 3D tilt surface.
 *
 * Wraps its children in a perspective stage and rotates the inner card toward
 * the cursor, with a soft radial glare that tracks the pointer. Children can
 * opt into depth by adding their own `translateZ(...)` (the inner card is
 * `transform-style: preserve-3d`). Fully static / no tilt for users who prefer
 * reduced motion.
 */
export default function TiltCard({
  children,
  className = "",
  innerClassName = "",
  max = 9,
  glare = true,
  style,
}: {
  children: ReactNode;
  /** Applied to the perspective stage (sizing / layout live here). */
  className?: string;
  /** Applied to the tilting inner card (visual surface: bg, border, radius). */
  innerClassName?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  glare?: boolean;
  style?: CSSProperties;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const inner = innerRef.current;
    if (!inner || reducedMotion()) return;
    const rect = inner.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 → 1
    const py = (e.clientY - rect.top) / rect.height; // 0 → 1
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      inner.style.transition = "transform 0.1s ease-out";
      inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
        2,
      )}deg) scale(1.02)`;
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${(
          px * 100
        ).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%)`;
      }
    });
  };

  const reset = () => {
    const inner = innerRef.current;
    if (!inner) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    inner.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    inner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      className={className}
      style={{ perspective: "1100px", ...style }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div
        ref={innerRef}
        className={`relative h-full [transform-style:preserve-3d] ${innerClassName}`}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{ borderRadius: "inherit", mixBlendMode: "soft-light" }}
          />
        )}
      </div>
    </div>
  );
}
