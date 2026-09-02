"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  Mail,
  Phone,
  QrCode,
  X,
} from "lucide-react";

import { GitHubIcon, LineIcon, LinkedInIcon } from "./icons";
import { profile } from "~/data/resume";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.githubUrl,
    external: true,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedinUrl,
    external: true,
  },
  // LINE has no useful web link — it opens the QR dialog instead.
  { icon: LineIcon, label: "LINE", value: profile.line, qr: true },
  {
    icon: Globe,
    label: "Website",
    value: profile.website,
    href: profile.websiteUrl,
    external: true,
  },
];

const cardClass =
  "group hover:border-accent-400/40 flex min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:bg-white/[0.06]";

export default function ContactChannels() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  const copyLineId = async () => {
    try {
      await navigator.clipboard.writeText(profile.line);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable outside a secure context; the ID is on screen
      // and selectable, so there is nothing to recover from.
    }
  };

  return (
    <>
      <div className="mt-9 grid gap-3 sm:grid-cols-2">
        {channels.map((c, i) => {
          const spanClass =
            i === channels.length - 1 && channels.length % 2 === 1
              ? " sm:col-span-2"
              : "";

          const body = (
            <>
              <span className="bg-accent-500/10 text-accent-400 grid h-10 w-10 shrink-0 place-items-center rounded-lg">
                <c.icon size={17} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] tracking-widest text-slate-500 uppercase">
                  {c.label}
                </span>
                <span className="block truncate text-sm text-slate-200">
                  {c.value}
                </span>
              </span>
            </>
          );

          if (c.qr) {
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                className={cardClass + spanClass}
              >
                {body}
                <QrCode
                  size={16}
                  aria-hidden="true"
                  className="group-hover:text-accent-400 shrink-0 text-slate-600 transition-colors"
                />
                <span className="sr-only">Show LINE QR code</span>
              </button>
            );
          }

          return (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cardClass + spanClass}
            >
              {body}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="group-hover:text-accent-400 shrink-0 text-slate-600 transition-colors"
              />
            </a>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="line-qr-title"
        onClose={() => setCopied(false)}
        // Clicking the dialog element itself means the backdrop was hit; the
        // inner wrapper stops clicks on the card from bubbling here.
        onClick={() => dialogRef.current?.close()}
        className="bg-ink-900 m-auto w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/10 p-0 text-slate-300 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-accent-400 font-mono text-[11px] tracking-widest uppercase">
                LINE
              </p>
              <h3
                id="line-qr-title"
                className="mt-1 font-mono text-lg font-semibold text-slate-50"
              >
                {profile.line}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:text-white"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <Image
            src={profile.lineQr}
            alt={`LINE QR code for ${profile.line}`}
            width={900}
            height={900}
            className="mt-5 w-full rounded-xl bg-white"
          />

          <button
            type="button"
            onClick={copyLineId}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            {copied ? (
              <Check
                size={15}
                aria-hidden="true"
                className="text-emerald-400"
              />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy LINE ID"}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Scan the code, or add me by ID.
          </p>
        </div>
      </dialog>
    </>
  );
}
