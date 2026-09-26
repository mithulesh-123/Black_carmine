"use client";

import { useEffect } from "react";

export function Grain() {
  useEffect(() => {
    const grain = document.querySelector<HTMLDivElement>(".grain");
    if (!grain) return;
    const handler = () => {
      // The grain animation is on ::after; pausing the host element's own
      // (nonexistent) animation is a no-op, so flag the pseudo-element.
      grain.dataset.paused = document.hidden ? "true" : "false";
    };
    handler();
    document.addEventListener("visibilitychange", handler);
    return () => {
      document.removeEventListener("visibilitychange", handler);
      delete grain.dataset.paused;
    };
  }, []);
  return <div className="grain" aria-hidden="true" />;
}