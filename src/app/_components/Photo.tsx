"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";

export type PhotoItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PhotoProps = {
  photos: readonly PhotoItem[];
  /** Milliseconds between slides. Omit to keep a single photo on screen. */
  intervalMs?: number;
  /** Shape of the frame — aspect-ratio utilities live here. */
  className?: string;
  /** Crop behaviour, e.g. an object-position. */
  imageClassName?: string;
  sizes: string;
};

/**
 * A cropped frame that opens the full image in a dialog. Given several photos
 * and an interval it crossfades between them, pausing while a pointer is over
 * the frame or the enlarged view is open so the image never swaps underfoot.
 */
export default function Photo({
  photos,
  intervalMs,
  className = "",
  imageClassName = "object-cover",
  sizes,
}: PhotoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const cycles = photos.length > 1 && !!intervalMs;

  useEffect(() => {
    if (!cycles || paused) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [cycles, paused, intervalMs, photos.length]);

  const current = photos[index] ?? photos[0];
  if (!current) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setPaused(true);
          dialogRef.current?.showModal();
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!dialogRef.current?.open) setPaused(false);
        }}
        aria-label={`View larger: ${current.alt}`}
        className={`group hover:border-accent-400/40 relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 transition-colors ${className}`}
      >
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            fill
            sizes={sizes}
            className={`transition-[opacity,transform] duration-700 group-hover:scale-[1.03] ${
              i === index ? "opacity-100" : "opacity-0"
            } ${imageClassName}`}
          />
        ))}
        <span
          aria-hidden="true"
          className="from-ink-950/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
        />

        {cycles && (
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-3 flex items-center gap-1.5"
          >
            {photos.map((photo, i) => (
              <span
                key={photo.src}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-accent-400 w-5" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </span>
        )}

        <span
          aria-hidden="true"
          className="bg-ink-950/70 absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-lg text-slate-300 opacity-70 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <Expand size={14} />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={current.alt}
        onClose={() => setPaused(false)}
        // A click that lands on the dialog itself is a backdrop click; the
        // wrapper below stops clicks on the image from reaching here.
        onClick={() => dialogRef.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="90vw"
            className="h-auto max-h-[82vh] w-auto max-w-[92vw] rounded-xl"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="bg-ink-950/80 absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-slate-200 backdrop-blur-sm transition-colors hover:text-white"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
