import { profile } from "~/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-center sm:flex-row sm:px-8 sm:text-left">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js and
          Tailwind CSS
        </p>
        <a
          href="#top"
          className="hover:text-accent-400 font-mono text-xs text-slate-500 transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
