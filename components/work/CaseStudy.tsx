"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import type { Project } from "@/lib/data";
import { ProjectThumb } from "@/components/visuals/ProjectVisual";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";

export function CaseStudy({
  project,
  nextSlug,
  nextName,
}: {
  project: Project;
  nextSlug: string;
  nextName: string;
}) {
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      visualRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.15,
      },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <>
      <section className="section">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <Link
            href="/work"
            data-cursor="hover"
            className="group mb-12 inline-flex items-center gap-3"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:text-ink">
              All projects
            </span>
          </Link>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.2em] text-carmine">
                {project.index}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                {project.nature} · {project.year}
              </span>
            </div>

            <AnimatedText
              as="h1"
              split="lines"
              className="display-lg max-w-5xl text-balance"
            >
              {project.name}
            </AnimatedText>

            <p className="mt-2 max-w-2xl text-pretty text-base leading-relaxed text-ink-dim">
              {project.summary}
            </p>
          </div>

          <div
            ref={visualRef}
            className="relative mt-12 aspect-[21/9] w-full overflow-hidden border border-line"
          >
            <ProjectThumb project={project} className="h-full w-full" />
          </div>

          {/* Meta */}
          <div className="mt-px grid grid-cols-2 border border-line bg-line md:grid-cols-4">
            <MetaCell label="Category" value={project.category} />
            <MetaCell label="Nature" value={project.nature} />
            <MetaCell label="Scope" value={project.scope.join(" · ")} />
            <MetaCell label="Stack" value={project.stack.join(" · ")} />
          </div>
        </div>
      </section>

      <section className="border-t border-line pb-10">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:h-fit">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 bg-carmine" />
                <span className="label text-carmine">The story</span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-extrabold uppercase tracking-tight text-ink md:text-4xl">
                {project.story.lead}
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {project.story.paragraphs.map((p, i) => (
                <Reveal key={i} y={20} duration={0.8}>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-ink-dim">
                    {p}
                  </p>
                </Reveal>
              ))}

              <Reveal y={20} duration={0.8}>
                <div className="mt-6 border-t border-line pt-8">
                  <span className="label text-muted">How we approached it</span>
                  <ul className="mt-5 flex flex-col gap-3">
                    {project.approach.map((a) => (
                      <li
                        key={a}
                        className="flex items-baseline gap-4 text-sm text-ink-dim md:text-base"
                      >
                        <span className="mt-px h-1.5 w-1.5 shrink-0 rotate-45 bg-carmine" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="label text-muted">Next project</span>
              <Link
                href={`/work/${nextSlug}`}
                data-cursor="view"
                data-cursor-label="View"
                className="group mt-4 inline-flex items-baseline gap-4"
              >
                <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-2 md:text-5xl">
                  {nextName}
                </span>
                <svg
                  className="h-5 w-5 text-carmine transition-transform duration-500 group-hover:translate-x-2"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </div>
            <SmartLink
              href="#contact"
              data-cursor="hover"
              className="group relative inline-flex items-center overflow-hidden border border-carmine px-7 py-4"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-carmine transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />
              <span className="relative z-10 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-colors duration-300 group-hover:text-white">
                Start a project
              </span>
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 bg-bg p-5">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-carmine">
        {label}
      </span>
      <span className="text-sm leading-relaxed text-ink-dim">{value}</span>
    </div>
  );
}
