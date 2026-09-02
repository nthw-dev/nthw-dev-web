"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// The zeroing below must land before paint, but useLayoutEffect has no meaning
// while server-rendering, where the real value is what we want in the HTML.
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Counts a stat up to its final value the first time it is on screen.
 * The value keeps whatever suffix it carries ("100k", "80%+"), and anything
 * without a leading number is rendered untouched.
 */
export default function CountUp({
  value,
  durationMs = 2000,
  delayMs = 0,
}: {
  value: string;
  durationMs?: number;
  delayMs?: number;
}) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the real value so server-rendered HTML is correct with or
  // without JS; the effect below rewinds it to zero before the first paint.
  const [display, setDisplay] = useState(value);

  useBeforePaint(() => {
    const el = ref.current;
    if (target === null || !el) return;

    const settle = () => setDisplay(`${target}${suffix}`);

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      settle();
      return;
    }

    setDisplay(`0${suffix}`);

    let frame = 0;
    let timer = 0;

    const run = () => {
      // Time from the first frame's own timestamp: mixing clocks (rAF vs
      // performance.now) can leave `elapsed` permanently negative.
      let startTs: number | null = null;

      const step = (now: number) => {
        startTs ??= now;
        const elapsed = now - startTs - delayMs;

        if (elapsed < 0) {
          frame = requestAnimationFrame(step);
          return;
        }

        const t = Math.min(elapsed / durationMs, 1);
        // Ease out so the number decelerates into its final value.
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(step);
      };

      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    // Safety net: the real number lands even if no frame is ever produced.
    timer = window.setTimeout(settle, delayMs + durationMs + 1200);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [target, suffix, durationMs, delayMs, value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
