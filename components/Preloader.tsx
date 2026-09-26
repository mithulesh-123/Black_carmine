"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Interfaces", "Motion", "Systems", "Signal"];

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<SVGSVGElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    document.body.classList.add("is-loading");
    return () => {
      document.body.classList.remove("is-loading");
    };
  }, [finished]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const state = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          setFinished(true);
          window.dispatchEvent(new CustomEvent("bc:loaded"));
        },
      });

      tl.set(root, { autoAlpha: 1 })
        .fromTo(
          monogramRef.current?.querySelectorAll("rect") ?? [],
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: reduce ? 0.01 : 1.1,
            ease: "power2.inOut",
            stagger: 0.12,
          },
          0.1,
        )
        .to(
          state,
          {
            v: 100,
            duration: reduce ? 0.05 : 2.1,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = Math.round(state.v);
              if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
              if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
              if (wordRef.current) {
                const idx = Math.min(WORDS.length - 1, Math.floor((v / 100) * WORDS.length));
                const next = WORDS[idx];
                if (wordRef.current.textContent !== next) {
                  wordRef.current.textContent = next;
                  gsap.fromTo(
                    wordRef.current,
                    { yPercent: -100, autoAlpha: 0 },
                    { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" },
                  );
                }
              }
            },
          },
          0.1,
        )
        .to(
          [".pl-door-l", ".pl-door-r"],
          {
            xPercent: (i: number) => (i === 0 ? -100 : 100),
            duration: reduce ? 0.05 : 0.95,
            ease: "expo.inOut",
          },
          "+=0.25",
        )
        .set(root, { autoAlpha: 0 });
    },
    { dependencies: [] },
  );

  if (finished) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{ visibility: "visible" }}
      aria-hidden="true"
      role="presentation"
    >
      <div className="pl-door-l absolute inset-y-0 left-0 flex w-1/2 items-center justify-end bg-bg">
        <span className="block h-full w-px bg-carmine" />
      </div>
      <div className="pl-door-r absolute inset-y-0 right-0 flex w-1/2 items-center justify-start bg-bg">
        <span className="block h-full w-px bg-carmine" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <svg
          ref={monogramRef}
          viewBox="0 0 120 120"
          className="h-24 w-24 md:h-32 md:w-32"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="6"
            y="6"
            width="108"
            height="108"
            stroke="rgba(244,241,234,0.35)"
            strokeWidth="1.5"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <rect
            x="14"
            y="14"
            width="92"
            height="92"
            stroke="var(--carmine)"
            strokeWidth="2"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <text
            x="60"
            y="63"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--ink)"
            style={{ font: "800 46px var(--font-display)" }}
          >
            BC
          </text>
        </svg>

        <div className="mt-8 overflow-hidden">
          <span
            ref={wordRef}
            className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-muted"
          >
            {WORDS[0]}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10">
        <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-2">
            BLACKCARMINE
          </span>
          <div className="flex items-baseline gap-3">
            <span
              ref={countRef}
              className="font-display text-2xl font-extrabold tabular-nums text-ink md:text-4xl"
            >
              000
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-2">
              / 100
            </span>
          </div>
        </div>
        <div className="mx-auto mt-5 h-px w-full max-w-[1600px] overflow-hidden bg-line">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-carmine"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
