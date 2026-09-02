import { ArrowUpRight, Globe, MapPin } from "lucide-react";

import Reveal from "./Reveal";
import Section from "./Section";
import { experiences } from "~/data/resume";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Track record" title="Where I've worked">
      <ol className="relative space-y-6 sm:space-y-8">
        {/* Timeline rail — hidden on small screens where there is no room */}
        <span
          aria-hidden="true"
          className="from-accent-500/50 absolute top-2 bottom-2 left-[7px] hidden w-px bg-gradient-to-b via-white/10 to-transparent sm:block"
        />

        {experiences.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            className="relative sm:pl-10"
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 hidden h-[15px] w-[15px] translate-y-6 rounded-full border-2 sm:block ${
                job.current
                  ? "border-accent-400 bg-accent-400"
                  : "border-ink-600 bg-ink-850"
              }`}
            />

            <Reveal from="left" delay={i * 160}>
              <article className="bg-ink-900 rounded-2xl border border-white/10 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/20 sm:p-7">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
                      {job.role}
                    </h3>
                    <p className="text-accent-300 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                      {job.company}
                      {job.place && (
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          {job.remote ? (
                            <Globe size={12} aria-hidden="true" />
                          ) : (
                            <MapPin size={12} aria-hidden="true" />
                          )}
                          {job.place}
                        </span>
                      )}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 self-start rounded-full px-3 py-1 font-mono text-xs whitespace-nowrap ${
                      job.current
                        ? "bg-accent-500/15 text-accent-300 ring-accent-400/30 ring-1"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {job.period}
                  </span>
                </header>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {job.context}
                </p>

                {job.links && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:border-accent-400/40 hover:text-accent-300 inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-300 transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}

                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-slate-400"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-accent-400 mt-2 h-1 w-1 shrink-0 rounded-full"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/5 pt-5">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-400"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
