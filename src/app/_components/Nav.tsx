"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileDown } from "lucide-react";

import { profile } from "~/data/resume";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently occupying the upper half of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-ink-950/85 border-b border-white/10 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-slate-100"
        >
          <span className="from-accent-400 to-accent-600 text-ink-950 grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br text-[13px] font-bold">
            NN
          </span>
          <span className="hidden sm:inline">
            nthw<span className="text-accent-400">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                active === s.id
                  ? "text-accent-300"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {s.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-accent-400/40 bg-accent-500/10 text-accent-300 hover:bg-accent-500/20 ml-3 inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors"
          >
            <FileDown size={15} aria-hidden="true" />
            Résumé
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="bg-ink-950/95 border-t border-white/10 backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-3 text-base transition-colors ${
                active === s.id
                  ? "text-accent-300 bg-white/5"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {s.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="border-accent-400/40 bg-accent-500/10 text-accent-300 mt-2 inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-base font-medium"
          >
            <FileDown size={16} aria-hidden="true" />
            Download résumé
          </a>
        </div>
      </div>
    </header>
  );
}
