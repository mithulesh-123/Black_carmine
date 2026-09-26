"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SOCIALS } from "@/lib/data";
import { SmartLink } from "@/components/ui/SmartLink";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="label text-muted">Navigate</span>
            <nav className="flex flex-col gap-2.5" aria-label="Footer">
              {NAV_LINKS.map((l) => (
                <SmartLink
                  key={l.href}
                  href={l.href}
                  data-cursor="hover"
                  className="link-underline w-fit text-sm text-ink-dim transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                </SmartLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label text-muted">Elsewhere</span>
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="link-underline w-fit text-sm text-ink-dim transition-colors duration-300 hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label text-muted">Studio</span>
            <p className="text-sm text-ink-dim">
              Operating remotely —
              <br />
              working in CET, overlapping globally.
            </p>
            <SmartLink
              href="mailto:hello@blackcarmine.studio"
              data-cursor="hover"
              className="link-underline w-fit text-sm text-ink-dim transition-colors duration-300 hover:text-ink"
            >
              hello@blackcarmine.studio
            </SmartLink>
            <Clock />
          </div>

          <div className="flex flex-col gap-4">
            <span className="label text-muted">Back to the top</span>
            <SmartLink
              href="#top"
              data-cursor="hover"
              className="group inline-flex w-fit items-center gap-3 border border-line-strong px-5 py-3 transition-colors duration-500 hover:border-ink"
            >
              <svg
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path d="M7 13V1M2 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                Top
              </span>
            </SmartLink>
          </div>
        </div>

        {/* Giant wordmark */}
        <div
          className="pointer-events-none mt-16 select-none font-display font-extrabold uppercase leading-none text-ink/[0.05]"
          style={{ fontSize: "clamp(2.75rem, 12.5vw, 12rem)" }}
          aria-hidden="true"
        >
          BlackCarmine
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-2">
            © 2026 BlackCarmine — all rights reserved
          </span>
          <div className="flex gap-6">
            <SmartLink
              href="#top"
              data-cursor="hover"
              className="link-underline font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-2 transition-colors duration-300 hover:text-ink"
            >
              Terms
            </SmartLink>
            <SmartLink
              href="#top"
              data-cursor="hover"
              className="link-underline font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-2 transition-colors duration-300 hover:text-ink"
            >
              Privacy
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Clock() {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Berlin",
          hour12: false,
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-carmine" />
      <span className="font-mono text-sm tabular-nums text-ink-dim">{time}</span>
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-2">
        CET
      </span>
    </div>
  );
}
