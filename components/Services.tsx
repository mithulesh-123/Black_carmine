"use client";

import { useState } from "react";
import { SERVICES, type Service } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceVisual } from "@/components/visuals/ProjectVisual";

export function Services() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<string | null>(SERVICES[0].id);

  return (
    <section id="services" className="section relative">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything needed to ship"
          />
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink-dim md:text-base">
            Nine disciplines, one team. Each engagement is scoped as a vertical
            slice so you see working software early instead of a long plan.
          </p>
        </div>

        {/* Desktop: interactive list + sticky preview */}
        <div className="mt-14 hidden gap-10 xl:grid xl:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col border-t border-line">
            {SERVICES.map((service, i) => (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="hover"
                aria-pressed={active === i}
                className="group flex items-baseline gap-5 border-b border-line py-6 text-left transition-colors duration-500"
              >
                <span
                  className={`shrink-0 font-mono text-xs tracking-[0.2em] transition-colors duration-500 ${
                    active === i ? "text-carmine" : "text-muted-2"
                  }`}
                >
                  {service.index}
                </span>
                <span
                  className={`min-w-0 font-display text-3xl font-extrabold uppercase tracking-tight transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-2 2xl:text-4xl ${
                    active === i ? "text-ink" : "text-muted group-hover:text-ink-dim"
                  }`}
                >
                  {service.title}
                </span>
                <span className="ml-auto hidden translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                  <Arrow />
                </span>
              </button>
            ))}
          </div>

          <div className="sticky top-[calc(var(--header-h)+2rem)] h-[64vh] min-h-[420px]">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className="absolute inset-0 flex flex-col transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  opacity: active === i ? 1 : 0,
                  visibility: active === i ? "visible" : "hidden",
                  transitionDelay: active === i ? "120ms" : "0ms",
                }}
                aria-hidden={active !== i}
              >
                <div className="relative h-1/2 w-full overflow-hidden border border-line">
                  <ServiceVisual
                    variant={service.visual}
                    className="h-full w-full"
                  />
                  <div className="absolute left-4 top-4 bg-bg/70 px-3 py-1 backdrop-blur-sm">
                    <span className="label text-carmine">{service.index}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-5 border border-t-0 border-line bg-surface p-6">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-carmine">
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                      {service.description}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: accordion */}
        <div className="mt-12 border-t border-line xl:hidden">
          {SERVICES.map((service) => (
            <ServiceAccordionRow
              key={service.id}
              service={service}
              open={openMobile === service.id}
              onToggle={() =>
                setOpenMobile((cur) => (cur === service.id ? null : service.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAccordionRow({
  service,
  open,
  onToggle,
}: {
  service: Service;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-baseline gap-4 py-5 text-left"
      >
        <span className="font-mono text-xs shrink-0 tracking-[0.2em] text-carmine">
          {service.index}
        </span>
        <span className="min-w-0 font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
          {service.title}
        </span>
        <span
          className={`ml-auto shrink-0 pl-2 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus />
        </span>
      </button>
      <div className="expand-grid" data-open={open}>
        <div className="expand-inner">
          <div className="flex flex-col gap-5 pb-7">
            <div className="relative h-44 w-full overflow-hidden border border-line">
              <ServiceVisual
                variant={service.visual}
                className="h-full w-full"
              />
            </div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-carmine">
              {service.tagline}
            </p>
            <p className="text-sm leading-relaxed text-ink-dim">
              {service.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted"
                >
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="h-4 w-4 text-carmine"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Plus() {
  return (
    <svg
      className="h-4 w-4 text-carmine"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
