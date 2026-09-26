"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * On client navigations that carry a hash (e.g. /#services from another
 * route), scroll to the target once the page has mounted.
 */
export function HashHandler() {
  const pathname = usePathname();
  const { scrollTo, recalc } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || hash === "#top") return;

    const id = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (!el) return;
      // The Lenis instance survives route changes (it lives in the root
      // layout), so after navigating to a page of a different height its
      // cached scroll limit is stale and clamps the destination short.
      // Recalculate before scrolling, then sync ScrollTrigger positions.
      recalc();
      ScrollTrigger.refresh();
      scrollTo(hash, { offset: -8, duration: 1.1 });
    }, 850);

    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
