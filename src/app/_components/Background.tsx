import Image from "next/image";
import { GraduationCap, Languages } from "lucide-react";

import Photo from "./Photo";
import Reveal from "./Reveal";
import Section from "./Section";
import { education, languages } from "~/data/resume";

export default function Background() {
  return (
    <Section id="background" eyebrow="Foundation" title="Education & languages">
      {/* One rotating photo on one side, the two text cards stacked on the
          other, so the columns carry similar visual weight on wide screens. */}
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
        <Reveal from="left">
          <div className="mx-auto w-full max-w-[300px] lg:max-w-none">
            <Photo
              photos={education.photos}
              intervalMs={2000}
              className="aspect-4/5"
              sizes="300px"
            />
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal from="right" delay={220}>
            <article className="bg-ink-900 rounded-2xl border border-white/10 p-6">
              <h3 className="mb-5 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
                <GraduationCap size={15} aria-hidden="true" />
                Education
              </h3>
              <div className="flex items-start gap-4">
                <Image
                  src={education.logo}
                  alt="Suranaree University of Technology logo"
                  width={56}
                  height={56}
                  unoptimized
                  className="h-14 w-14 shrink-0 rounded-lg bg-white/5 object-contain p-1"
                />
                <div>
                  <p className="font-semibold text-slate-100">
                    {education.degree}
                  </p>
                  <p className="text-accent-300 mt-1 text-sm">
                    {education.school}
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {education.period}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal from="right" delay={440}>
            <article className="bg-ink-900 rounded-2xl border border-white/10 p-6">
              <h3 className="mb-5 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
                <Languages size={15} aria-hidden="true" />
                Languages
              </h3>
              <dl className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="font-medium text-slate-100">{lang.name}</dt>
                    <dd className="font-mono text-xs text-slate-400">
                      {lang.level}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
