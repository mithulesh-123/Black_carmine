"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rotate-45 bg-carmine" />
        <span className="label text-carmine">{eyebrow}</span>
      </div>
      <AnimatedText
        as="h2"
        split="lines"
        className="display-lg text-balance"
      >
        {title}
      </AnimatedText>
    </div>
  );
}
