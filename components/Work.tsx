"use client";

import { createContext, useContext, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { PROJECTS, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectThumb } from "@/components/visuals/ProjectVisual";

type PreviewApi = {
  show: (p: Project) => void;
  hide: () => void;
};

const PreviewContext = createContext<PreviewApi | null>(null);

const PREVIEW_W = 320;
const PREVIEW_H = 210;

export function Work() {
  const panelRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string | null>(null);

  useGSAP(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const xTo = gsap.quickTo(panel, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(panel, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = Math.min(Math.max(e.clientX + 24, 8), w - PREVIEW_W - 8);
      const y = Math.min(Math.max(e.clientY - PREVIEW_H / 2, 8), h - PREVIEW_H - 8);
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const api: PreviewApi = {
    show: (p: Project) => {
      activeRef.current = p.slug;
      const panel = panelRef.current;
      const thumbs = thumbsRef.current;
      if (!panel || !thumbs) return;
      gsap.to(panel, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" });
      const nodes = Array.from(thumbs.children) as HTMLElement[];
      nodes.forEach((node) => {
        const on = node.dataset.slug === p.slug;
        gsap.to(node, {
          autoAlpha: on ? 1 : 0,
          scale: on ? 1 : 0.96,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    },
    hide: () => {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.4,
        ease: "power3.out",
      });
    },
  };

  return (
    <section id="work" className="section relative">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Selected work" title="Built, not pitched" />
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
            Internal R&amp;D, product experiments and partner collaborations.
            Each one shipped to production constraints — and lived there.
          </p>
        </div>

        <PreviewContext.Provider value={api}>
          {/* Desktop list */}
          <div className="mt-12 hidden border-t border-line md:block">
            {PROJECTS.map((project, i) => (
              <WorkRow key={project.slug} project={project} index={i} />
            ))}
          </div>

          {/* Mobile cards */}
          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:hidden">
            {PROJECTS.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </PreviewContext.Provider>

        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 border border-line-strong px-7 py-4 transition-colors duration-500 hover:border-ink"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-dim transition-colors duration-300 group-hover:text-ink">
              All projects
            </span>
          </Link>
        </div>
      </div>

      {/* Cursor-following preview */}
      <div
        ref={panelRef}
        className="pointer-events-none fixed left-0 top-0 z-[9980] hidden overflow-hidden border border-line-strong shadow-2xl shadow-black/60 md:block"
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          opacity: 0,
          visibility: "hidden",
        }}
        aria-hidden="true"
      >
        <div ref={thumbsRef} className="relative h-full w-full">
          {PROJECTS.map((p) => (
            <div
              key={p.slug}
              data-slug={p.slug}
              className="absolute inset-0"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <ProjectThumb project={p} className="h-full w-full" />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-bg to-transparent px-4 pb-3 pt-8">
                <span className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                  {p.name}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted">
                  {p.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  const api = useContext(PreviewContext);

  return (
    <Reveal y={20} delay={Math.min(index * 0.05, 0.3)} duration={0.8}>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        data-cursor-label="View"
        onMouseEnter={() => api?.show(project)}
        onMouseLeave={() => api?.hide()}
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-6 transition-colors duration-500 hover:bg-surface/50"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-muted-2 transition-colors duration-500 group-hover:text-carmine">
          {project.index}
        </span>

        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
          <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-2 lg:text-4xl">
            {project.name}
          </span>
          <span className="text-sm text-muted">{project.category}</span>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex gap-2">
            {project.scope.slice(0, 2).map((s) => (
              <span
                key={s}
                className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <span className="font-mono text-[0.62rem] tracking-[0.15em] text-muted-2">
            {project.year}
          </span>
          <svg
            className="h-4 w-4 text-muted transition-all duration-500 group-hover:translate-x-1 group-hover:text-carmine"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </Link>
    </Reveal>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      className="group flex flex-col bg-bg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ProjectThumb
          project={project}
          className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-carmine">
            {project.index}
          </span>
          <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink">
            {project.name}
          </h3>
        </div>
        <p className="text-xs text-muted">{project.category}</p>
      </div>
    </Link>
  );
}
