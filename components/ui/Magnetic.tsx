"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: React.ElementType;
  href?: string;
  ariaLabel?: string;
};

/**
 * Magnetic wrapper — element drifts toward the pointer while hovered and
 * springs back on leave. Inner `[data-magnetic-inner]` counter-moves for a
 * subtle parallax read.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "div",
  href,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.9,
        ease: "power3.out",
      });
      if (inner) {
        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 1.1,
          ease: "power3.out",
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)" });
      if (inner) {
        gsap.to(inner, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)" });
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      href={href}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
