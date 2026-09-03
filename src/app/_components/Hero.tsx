import Image from "next/image";
import { ArrowDown, FileDown, Mail, MapPin } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "./icons";

import CountUp from "./CountUp";
import { domains, profile, stats } from "~/data/resume";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background: grid + two soft accent blooms */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="bg-accent-500/15 absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full blur-[120px]" />
        <div className="absolute -top-24 right-0 h-[24rem] w-[24rem] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p
              className="rise inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-xs text-emerald-300"
              style={{ animationDelay: "150ms" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {`Open to ${profile.title} roles`}
            </p>

            <h1
              className="rise mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "320ms" }}
            >
              <span className="text-gradient">Natthawat</span>
              <br />
              Narin
            </h1>

            <p
              className="text-accent-300 rise mt-5 font-mono text-base sm:text-lg"
              style={{ animationDelay: "560ms" }}
            >
              {profile.title}
              <span className="text-slate-600"> / </span>
              <span className="text-slate-400">{profile.subtitle}</span>
            </p>

            <p
              className="rise mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
              style={{ animationDelay: "760ms" }}
            >
              {profile.tagline}
            </p>

            <p
              className="rise mt-5 flex items-center gap-2 text-sm text-slate-500"
              style={{ animationDelay: "940ms" }}
            >
              <MapPin size={15} aria-hidden="true" />
              {profile.location}
            </p>

            <div
              className="rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "1100ms" }}
            >
              <a
                href="#contact"
                className="bg-accent-500 text-ink-950 hover:bg-accent-400 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
              >
                <Mail size={16} aria-hidden="true" />
                Get in touch
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <FileDown size={16} aria-hidden="true" />
                Résumé
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <GitHubIcon size={17} />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <LinkedInIcon size={17} />
              </a>
            </div>
          </div>

          {/* Portrait — first on small screens would push the headline down, so
              it sits after the copy in the DOM and is centered on mobile. */}
          <div className="order-first flex justify-center lg:order-none lg:justify-end">
            <div className="rise relative" style={{ animationDelay: "440ms" }}>
              <div
                aria-hidden="true"
                className="from-accent-500/30 absolute -inset-3 rounded-full bg-gradient-to-tr to-indigo-500/20 blur-2xl"
              />
              <Image
                src={profile.avatar}
                alt={`${profile.name}, ${profile.title}`}
                width={320}
                height={320}
                priority
                className="relative h-40 w-40 rounded-full border border-white/10 object-cover shadow-2xl sm:h-52 sm:w-52 lg:h-72 lg:w-72"
              />

              {/* Nickname tag, hugging the portrait's lower-left arc. It sits
                  after the image so it paints above both it and the glow. */}
              <span className="border-accent-400/30 bg-ink-900/90 text-accent-300 absolute -bottom-1 -left-1 rounded-full border px-3 py-1 font-mono text-xs whitespace-nowrap shadow-lg backdrop-blur-sm sm:-bottom-2 sm:-left-2 sm:px-3.5 sm:py-1.5 sm:text-sm">
                {profile.nickname}
              </span>
            </div>
          </div>
        </div>

        {/* Domain chips */}
        <ul
          className="rise mt-14 flex flex-wrap gap-2"
          style={{ animationDelay: "1320ms" }}
        >
          {domains.map((d) => (
            <li
              key={d}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-400"
            >
              {d}
            </li>
          ))}
        </ul>

        {/* Stats strip. The 1px separators are the container's background
            showing through the gaps, so the strip fades in as one piece: a
            per-cell stagger would leave that background bare — a grey block —
            wherever a cell had not arrived yet. The numbers keep their own
            stagger through CountUp. */}
        <dl
          className="rise mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
          style={{ animationDelay: "1500ms" }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="bg-ink-900 px-5 py-6">
              <dd className="font-mono text-3xl font-bold text-slate-50 sm:text-4xl">
                <CountUp value={s.value} delayMs={1600 + i * 160} />
              </dd>
              <dt className="mt-2 text-sm font-medium text-slate-300">
                {s.label}
              </dt>
              <p className="mt-1 text-xs text-slate-500">{s.detail}</p>
            </div>
          ))}
        </dl>

        <a
          href="#about"
          className="rise hover:text-accent-300 mt-14 hidden items-center gap-2 font-mono text-xs tracking-widest text-slate-500 uppercase transition-colors sm:inline-flex"
          style={{ animationDelay: "2500ms" }}
        >
          <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
          Scroll
        </a>
      </div>
    </section>
  );
}
