"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Magnetic } from "@/components/ui/Magnetic";
import { SmartLink } from "@/components/ui/SmartLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const orbRef = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const orbs = [orbRef.current, orb2Ref.current].filter((el): el is HTMLDivElement => !!el);
    if (orbs.length === 0) return;

    // GSAP composes x (px) with xPercent (%) into a single transform, so the
    // two tweens below coexist cleanly — drift is %-based, parallax is px.
    // will-change is set once so the two blurred layers stay promoted instead
    // of being (de)promoted as the tweens start and stop.
    gsap.set(orbs, { willChange: "transform" });

    // Ambient drift for the background orbs
    const drift = [
      gsap.to(orbs[0], {
        xPercent: 14,
        yPercent: -10,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }),
      gsap.to(orbs[1], {
        xPercent: -18,
        yPercent: 12,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }),
    ];

    // Pointer parallax
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(orbs[0], { x: x * 40, y: y * 30, duration: 1.4, ease: "power2.out" });
      gsap.to(orbs[1], { x: x * -60, y: y * -24, duration: 1.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Pause the infinite drift while the hero is offscreen
    const st = ScrollTrigger.create({
      trigger: orbs[0].parentElement!,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => drift.forEach((t) => t.pause()),
      onEnter: () => drift.forEach((t) => t.play()),
      onLeaveBack: () => drift.forEach((t) => t.play()),
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      st.kill();
      drift.forEach((t) => t.kill());
    };
  }, []);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cue = gsap.to(scrollRef.current, {
      y: 10,
      opacity: 0.25,
      duration: 1.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => cue.kill();
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[var(--header-h)]"
    >
      {/* Ambient field */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute -left-[10%] top-[8%] h-[55vh] w-[55vh] rounded-full opacity-50 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--carmine-glow), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute -right-[8%] bottom-[2%] h-[45vh] w-[45vh] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(142,0,40,0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Watermark monogram */}
      <div
        className="pointer-events-none absolute -right-[4vw] top-[14vh] select-none font-display font-extrabold leading-none text-ink/[0.03]"
        style={{ fontSize: "min(42vw, 38rem)" }}
        aria-hidden="true"
      >
        BC
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-10 md:gap-14">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-carmine" />
            <AnimatedText
              trigger="load"
              as="p"
              split="words"
              className="label text-muted"
              duration={0.7}
            >
              Full-service digital agency
            </AnimatedText>
          </div>

          {/* Headline */}
          <h1 className="display-xl text-balance">
            <AnimatedText
              trigger="load"
              as="span"
              className="block"
            >
              Digital products
            </AnimatedText>
            <AnimatedText
              trigger="load"
              as="span"
              className="block"
              delay={0.08}
            >
              engineered to
            </AnimatedText>
            <AnimatedText
              trigger="load"
              as="span"
              className="block text-carmine-gradient"
              delay={0.16}
            >
              be felt.
            </AnimatedText>
          </h1>

          {/* Sub + CTA */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-ink-dim md:text-lg">
              BLACKCARMINE designs and engineers web platforms, mobile apps, SaaS,
              brand systems and AI-driven products — from first sketch to
              production traffic.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic as="div" strength={0.4} className="inline-block">
                <SmartLink
                  href="#contact"
                  data-cursor="hover"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-carmine px-7 py-4 text-white"
                >
                  <span
                    data-magnetic-inner
                    className="relative z-10 font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                  >
                    Start a project
                  </span>
                  <svg
                    className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </SmartLink>
              </Magnetic>

              <Magnetic as="div" strength={0.3} className="inline-block">
                <SmartLink
                  href="#work"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 border border-line-strong px-7 py-4 transition-colors duration-500 hover:border-ink"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-dim transition-colors duration-300 group-hover:text-ink">
                    View selected work
                  </span>
                </SmartLink>
              </Magnetic>
            </div>
          </div>

          {/* Fact row — counts of real site content, not invented metrics */}
          <div className="mt-4 grid grid-cols-3 gap-6 border-t border-line pt-8 sm:max-w-md md:mt-8">
            {[
              { v: "09", l: "Capabilities" },
              { v: "06", l: "Selected works" },
              { v: "18", l: "Tools in stack" },
            ].map((f) => (
              <div key={f.l}>
                <div className="font-display text-2xl font-extrabold text-ink md:text-3xl">
                  {f.v}
                </div>
                <div className="mt-1 hidden text-[0.65rem] uppercase tracking-[0.18em] text-muted sm:block">
                  {f.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <div
          ref={scrollRef}
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted"
        >
          Scroll
        </div>
        <div className="h-10 w-px bg-gradient-to-b from-carmine to-transparent" />
      </div>
    </section>
  );
}
