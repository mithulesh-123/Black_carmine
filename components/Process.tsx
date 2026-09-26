"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";

export function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const rail = railRef.current;
    const section = sectionRef.current;
    if (!rail || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      rail,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section relative border-y border-line bg-bg-2"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <SectionHeading eyebrow="Process" title="How the work gets made" />

        <div className="mt-14 grid gap-x-12 gap-y-0 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Sticky rail */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+4rem)]">
              <div className="relative pl-10">
                <div className="absolute left-0 top-2 h-full w-px bg-line">
                  <div
                    ref={railRef}
                    className="absolute left-0 top-0 h-full w-full origin-top bg-carmine"
                    style={{ transform: "scaleY(0)" }}
                  />
                </div>
                <span className="label text-muted">Delivery model</span>
                <p className="mt-5 text-pretty text-sm leading-relaxed text-ink-dim">
                  Five movements, repeated in weekly cycles. You see working
                  software from week two — the plan bends to what we learn from
                  it, never the reverse.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepItem key={step.index} step={step} isLast={i === PROCESS_STEPS.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStepItem({
  step,
  isLast,
}: {
  step: (typeof PROCESS_STEPS)[number];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set(el, { autoAlpha: 0, y: 30 });
      const tween = gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [] },
  );

  return (
    <div
      ref={ref}
      className={`group flex gap-6 border-line py-8 md:gap-10 ${
        isLast ? "pb-0" : "border-b"
      }`}
    >
      <span className="font-mono text-xs tracking-[0.2em] text-carmine md:text-sm">
        {step.index}
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink transition-colors duration-500 group-hover:text-carmine md:text-4xl">
          {step.title}
        </h3>
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
          {step.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {step.artifacts.map((a) => (
            <li
              key={a}
              className="border border-line bg-surface px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
