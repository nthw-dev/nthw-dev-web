import {
  Cloud,
  Code2,
  Database,
  FlaskConical,
  Layout,
  Server,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import Reveal from "./Reveal";
import Section from "./Section";
import { skills } from "~/data/resume";

const icons: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Smartphone,
  Server,
  Database,
  Workflow,
  FlaskConical,
  Cloud,
};

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="Technical skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => {
          const Icon = icons[group.icon] ?? Code2;
          return (
            <Reveal key={group.title} from="scale" delay={(i % 4) * 170}>
              <article className="bg-ink-900 hover:border-accent-400/30 h-full rounded-2xl border border-white/10 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-accent-500/10 text-accent-400 grid h-9 w-9 place-items-center rounded-lg">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100">
                    {group.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
