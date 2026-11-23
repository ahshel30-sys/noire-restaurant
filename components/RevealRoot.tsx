"use client";

import { useEffect } from "react";

/**
 * Adds `data-revealed` to every `[data-reveal]` element as it enters the
 * viewport. The visual treatment lives in CSS, so a section can opt out or
 * define its own reveal without touching JavaScript.
 */
export default function RevealRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.dataset.revealed = "";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
