"use client";

import { STUDIO_FACTS } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

const BELIEFS = [
  {
    n: "01",
    t: "Senior hands, no relay",
    d: "The people in the room are the people who write the code and draw the pixels. No account layer, no translation loss.",
  },
  {
    n: "02",
    t: "Working software weekly",
    d: "Vertical slices deployed to a preview environment you control. Progress you can click, not a Gantt chart to trust.",
  },
  {
    n: "03",
    t: "Honest scopes",
    d: "We tell you what we would cut before we build it. Estimates come with the reasoning attached, so you can re-plan with us.",
  },
  {
    n: "04",
    t: "Performance is design",
    d: "Milliseconds are a material like colour and type. We budget them, measure them, and ship against the budget.",
  },
];

export function Studio() {
  return (
    <section id="studio" className="section relative border-t border-line">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:h-fit">
            <SectionHeading eyebrow="Studio" title="Small on purpose" />
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
              BLACKCARMINE is a deliberately compact studio of senior designers
              and engineers. We stay small so the people you brief are the
              people who build — and so every line of the work is held to one
              standard instead of diluted across a hierarchy.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
              {STUDIO_FACTS.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5 bg-bg p-4">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-carmine">
                    {f.label}
                  </dt>
                  <dd className="text-sm text-ink-dim">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-px border-t border-line">
            {BELIEFS.map((b) => (
              <Reveal key={b.n} y={24} duration={0.8}>
                <div className="group flex gap-6 border-b border-line py-8 md:gap-10">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-2 transition-colors duration-500 group-hover:text-carmine">
                    {b.n}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink transition-colors duration-500 group-hover:text-carmine md:text-2xl">
                      {b.t}
                    </h3>
                    <p className="max-w-xl text-pretty text-sm leading-relaxed text-ink-dim">
                      {b.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10 md:mt-24">
          <AnimatedText
            as="p"
            split="words"
            className="max-w-4xl text-pretty font-display text-xl font-bold leading-tight tracking-tight text-ink-dim md:text-3xl"
          >
            We take the projects where craft and engineering have to move
            together — and we hand over work your team can actually carry
            forward.
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
