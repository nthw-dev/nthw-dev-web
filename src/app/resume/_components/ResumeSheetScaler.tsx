'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// The sheet is a fixed A4 box, so it always overflows a phone (and an iPad in
// portrait). Rather than reflowing the document — which would stop it looking
// like the printed page — the whole sheet is scaled down to the width that is
// actually available. useLayoutEffect so the first paint is already scaled;
// guarded because the page is still server-rendered.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ResumeSheetScaler({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const frameRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{
    scale: number;
    width?: number;
    height?: number;
  }>({ scale: 1 });

  useIsomorphicLayoutEffect(() => {
    const frame = frameRef.current;
    const sheet = sheetRef.current;
    if (!frame || !sheet) return;

    const measure = () => {
      // offsetWidth/Height are the untransformed layout box, so reading them
      // back after scaling can't feed into itself — and it keeps the mm → px
      // conversion the browser's job instead of a hardcoded 96dpi constant.
      const sheetWidth = sheet.offsetWidth;
      const sheetHeight = sheet.offsetHeight;
      const available = frame.clientWidth;
      if (!sheetWidth || !sheetHeight || !available) return;

      // Never blow the sheet up past its true size on a desktop; only shrink it
      // to fit. Below `lg` the frame is the full viewport, so this is a
      // full-bleed A4 page on phones and on an iPad in portrait.
      const scale = Math.min(1, available / sheetWidth);
      setBox({
        scale,
        width: sheetWidth * scale,
        height: sheetHeight * scale,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(sheet);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="resume-sheet-frame w-full overflow-hidden">
      <div
        className="resume-sheet-box mx-auto"
        style={{ width: box.width, height: box.height }}
      >
        <div
          ref={sheetRef}
          className="resume-sheet w-fit origin-top-left"
          style={{ transform: `scale(${box.scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
