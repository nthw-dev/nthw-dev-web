import { Braces, GitBranch, Gauge } from "lucide-react";

import Photo from "./Photo";
import Reveal from "./Reveal";
import Section from "./Section";
import { summary, workingPhoto } from "~/data/resume";

const pillars = [
  {
    icon: Braces,
    title: "Backend & system design",
    body: "Go and Node services, event-driven with Kafka and RabbitMQ, designed around the failure modes rather than the happy path.",
  },
  {
    icon: Gauge,
    title: "Correctness under load",
    body: "Test coverage above 80%, k6 load profiles against stubbed dependencies, and bottlenecks removed before they reach production.",
  },
  {
    icon: GitBranch,
    title: "End-to-end delivery",
    body: "Web, mobile, CI/CD, and infrastructure — I can carry a product from an empty repository to something running for real users.",
  },
];

export default function About() {
  return (
    <Section id="about" eyebrow="Profile" title="Professional summary">
      {/* Photo, prose, pillars sit as three columns on wide screens and stack
          below that. The photo switches from a landscape crop to the full
          portrait once it has a narrow column of its own. */}
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal from="left" className="lg:col-span-3">
          <Photo
            photos={[workingPhoto]}
            className="aspect-3/2 md:aspect-21/9 lg:aspect-3/4"
            imageClassName="object-cover object-[50%_38%] lg:object-center"
            sizes="(min-width: 1024px) 25vw, 100vw"
          />
        </Reveal>

        <Reveal delay={200} className="lg:col-span-5">
          <div className="space-y-5">
            {summary.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-slate-400 sm:text-lg lg:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="space-y-4 lg:col-span-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} from="right" delay={350 + i * 220}>
              <article className="group bg-ink-900 hover:border-accent-400/30 rounded-2xl border border-white/10 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <span className="bg-accent-500/10 text-accent-400 grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                    <pillar.icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
