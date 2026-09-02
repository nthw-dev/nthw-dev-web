import ContactChannels from "./ContactChannels";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="bg-accent-500/10 pointer-events-none absolute inset-x-0 bottom-0 h-96 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="bg-ink-900/80 rounded-3xl border border-white/10 p-7 backdrop-blur-sm sm:p-12">
            <p className="text-accent-400 mb-3 font-mono text-xs tracking-[0.2em] uppercase">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="max-w-2xl text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
            >
              Have a system that needs to hold up?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
              I&apos;m open to senior backend and full-stack roles, and to
              consulting on fintech systems. The fastest way to reach me is
              email.
            </p>

            <ContactChannels />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
