"use client";

import { CAPABILITIES } from "@/lib/data";

export function Marquee({
  items = CAPABILITIES,
  duration = 38,
  direction = "left",
  className = "",
}: {
  items?: string[];
  duration?: number;
  direction?: "left" | "right";
  className?: string;
}) {
  const content = [...items, ...items];

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        data-dir={direction}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {content.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap font-display text-3xl font-extrabold uppercase tracking-tight text-ink/90 transition-colors duration-500 group-hover:text-muted md:text-5xl">
              {item}
            </span>
            <span className="mx-6 inline-block h-2.5 w-2.5 rotate-45 bg-carmine md:mx-9" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent md:w-48" />
    </div>
  );
}
