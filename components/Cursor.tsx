"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const enable = () => setEnabled(finePointer.matches);
    enable();
    finePointer.addEventListener("change", enable);
    return () => finePointer.removeEventListener("change", enable);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...target };
    const ringPos = { ...target };
    let raf = 0;
    let shown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      show();
      kick();
    };

    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (!el) return;
      const variant = el.getAttribute("data-cursor") || "hover";
      const text = el.getAttribute("data-cursor-label");
      ring.dataset.variant = variant;
      label.textContent = text ?? "";
      label.style.opacity = text ? "1" : "0";
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-cursor]");
      if (!el) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (related && el.contains(related)) return;
      delete ring.dataset.variant;
      label.style.opacity = "0";
      label.textContent = "";
    };

    // The dot/ring chase with damping, but only while it is still settling.
    // An always-on rAF loop would force compositing on two fixed layers on
    // every frame — even when the cursor is idle on a static page.
    const render = () => {
      const ringMoving =
        Math.abs(target.x - ringPos.x) > 0.1 || Math.abs(target.y - ringPos.y) > 0.1;

      dotPos.x += (target.x - dotPos.x) * 0.6;
      dotPos.y += (target.y - dotPos.y) * 0.6;
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;

      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;

      if (ringMoving) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (raf) return;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    kick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-20 w-20 items-center justify-center rounded-full border border-ink/35 transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] data-[variant=hover]:h-28 data-[variant=hover]:w-28 data-[variant=hover]:border-carmine/70 data-[variant=hover]:bg-carmine/10 data-[variant=view]:h-32 data-[variant=view]:w-32 data-[variant=view]:border-carmine data-[variant=view]:bg-carmine/15"
        style={{ opacity: 0, willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-carmine-soft transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-carmine"
        style={{ opacity: 0, willChange: "transform" }}
      />
    </div>
  );
}
