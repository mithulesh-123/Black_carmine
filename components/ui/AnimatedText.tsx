"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

type AnimatedTextProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  split?: "lines" | "words" | "chars";
  trigger?: "scroll" | "load";
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

const defaultStagger = (split: AnimatedTextProps["split"]) =>
  split === "lines" ? 0.09 : split === "words" ? 0.03 : 0.018;

/**
 * Text that splits into masked lines/words/chars and reveals with a clip
 * translate. `trigger="load"` waits for the preloader's `bc:loaded` event.
 */
export function AnimatedText({
  children,
  as: Tag = "div",
  className = "",
  split = "lines",
  trigger = "scroll",
  delay = 0,
  stagger,
  duration = 1.05,
  start = "top 88%",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let disposed = false;
      let splitInstance: SplitText | null = null;
      let st: ScrollTrigger | null = null;

      const run = () => {
        if (disposed || !el) return;

        splitInstance = new SplitText(el, {
          type: split,
          mask: split,
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
        });
        const targets = splitInstance[split] as HTMLElement[];
        const gap = stagger ?? defaultStagger(split);

        const play = () => {
          gsap.to(targets, {
            yPercent: 0,
            autoAlpha: 1,
            duration: reduce ? 0.01 : duration,
            ease: "power4.out",
            stagger: gap,
            delay,
          });
        };

        if (reduce) {
          splitInstance.revert();
          return;
        }

        gsap.set(targets, { yPercent: 115, autoAlpha: 0 });

        if (trigger === "load") {
          let fired = false;
          const begin = () => {
            if (fired || disposed) return;
            fired = true;
            window.removeEventListener("bc:loaded", begin);
            play();
          };
          window.addEventListener("bc:loaded", begin);
          // Fallback so hero text is never left hidden
          window.setTimeout(begin, 4200);
          return;
        }

        st = ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: play,
        });
      };

      // Webfonts change glyph metrics; splitting before they load locks in
      // wrong line breaks (SplitText is a snapshot, not live).
      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => run());
      } else {
        run();
      }

      return () => {
        disposed = true;
        st?.kill();
        splitInstance?.revert();
      };
    },
    { dependencies: [trigger, split, delay] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
