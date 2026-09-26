"use client";

import { TECHNOLOGIES } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Marquee } from "@/components/Marquee";

export function Technology() {
  return (
    <section id="technology" className="section relative">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Technology" title="The tools we reach for" />
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
            Boring technology where it matters, sharp tools where it counts. We
            optimise for your team&apos;s ability to maintain what we leave
            behind.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TECHNOLOGIES.map((tech) => (
            <div
              key={tech.name}
              data-cursor="hover"
              className="group relative flex aspect-square flex-col overflow-hidden border-b border-r border-line transition-colors duration-500"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-carmine transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />
              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-2 transition-colors duration-500 group-hover:text-white/80">
                  {tech.group}
                </span>
                <span className="font-display text-base font-bold uppercase leading-tight tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-0.5 group-hover:text-white md:text-lg">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 py-6">
        <Marquee
          items={[
            "Accessibility first",
            "Type-safe by default",
            "Edge-rendered",
            "Core Web Vitals as a budget",
            "Zero-downtime deploys",
            "Observable systems",
          ]}
          duration={42}
          direction="right"
        />
      </div>
    </section>
  );
}
