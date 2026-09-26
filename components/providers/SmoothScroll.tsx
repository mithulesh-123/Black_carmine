"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SmoothScrollValue = {
  scrollTo: (target: string | number, opts?: LenisScrollToOpts) => void;
  /** Force Lenis to re-measure the document (e.g. after a route change). */
  recalc: () => void;
};

type LenisScrollToOpts = {
  offset?: number;
  immediate?: boolean;
  duration?: number;
};

const SmoothScrollContext = createContext<SmoothScrollValue | null>(null);

export function useSmoothScroll(): SmoothScrollValue {
  const ctx = useContext(SmoothScrollContext);
  return ctx ?? { scrollTo: nativeScrollTo, recalc: () => {} };
}

function nativeScrollTo(target: string | number, opts?: LenisScrollToOpts) {
  if (typeof target === "string") {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: opts?.immediate ? "auto" : "smooth", block: "start" });
  } else {
    window.scrollTo({ top: target, behavior: opts?.immediate ? "auto" : "smooth" });
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number, opts?: LenisScrollToOpts) => {
      const lenis = lenisRef.current;
      if (!lenis) {
        nativeScrollTo(target, opts);
        return;
      }
      lenis.scrollTo(target, {
        immediate: opts?.immediate ?? false,
        duration: opts?.duration ?? 1.3,
      });
    },
    [],
  );

  const recalc = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    // Dimensions are cached and only recomputed on resize; after a route
    // change to a taller page the stale limit clamps scrollTo short.
    lenis.resize();
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, recalc }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
