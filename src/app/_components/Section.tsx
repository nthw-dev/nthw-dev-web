import type { ReactNode } from "react";

import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 ${className}`}
    >
      <Reveal className="mb-10 sm:mb-14">
        <p className="text-accent-400 mb-3 font-mono text-xs tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
        <h2
          id={`${id}-heading`}
          className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          {title}
        </h2>
        <div className="reveal-rule from-accent-500/60 mt-5 h-px w-full bg-gradient-to-r via-white/10 to-transparent" />
      </Reveal>
      {children}
    </section>
  );
}
