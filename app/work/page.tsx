import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/data";
import { ProjectThumb } from "@/components/visuals/ProjectVisual";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Internal R&D, product experiments and partner collaborations engineered by BLACKCARMINE.",
};

export default function WorkPage() {
  return (
    <main id="main" className="pt-[var(--header-h)]">
      <section className="section">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rotate-45 bg-carmine" />
            <span className="label text-carmine">Selected work</span>
          </div>
          <h1 className="mt-6 display-lg text-balance">Built, not pitched</h1>
          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
            Internal R&amp;D, product experiments and partner collaborations.
            Each one shipped to production constraints — and lived there.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                data-cursor="view"
                data-cursor-label="View"
                className="group flex flex-col bg-bg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectThumb
                    project={project}
                    className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute right-4 top-4 bg-bg/70 px-3 py-1 backdrop-blur-sm">
                    <span className="label text-carmine">{project.index}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                    {project.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {project.category} · {project.year}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    {project.summary}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
