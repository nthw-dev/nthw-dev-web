"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades content in the first time it scrolls into view. Content is present in
 * the DOM from the start, so it stays readable without JS or with reduced
 * motion (the `.reveal` class opts out under `prefers-reduced-motion`).
 */
export default function Reveal({
  children,
  delay = 0,
  from,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  /** Direction the content travels in from. Defaults to rising upward. */
  from?: "left" | "right" | "scale";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(el);

    // Safety net: nothing on the page stays invisible, whatever the observer does.
    const fallback = window.setTimeout(() => setVisible(true), 3000);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-from={from}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
