"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import DevCat, { type CatState } from "./DevCat";
import styles from "./DevCatMascot.module.css";

const SPLASH_MS = 2000;
const STORAGE_KEY = "devcat-hidden";
/**
 * What counts as a phone: a touch-first device, or a viewport narrower than the
 * 640px breakpoint the stylesheet already uses for the dock's phone layout.
 */
const MOBILE_QUERY = "(max-width: 639px), (pointer: coarse)";
/** How long after the last scroll the cat keeps "typing". */
const TYPING_LINGER_MS = 1400;
/** How long a click keeps the cat pleased. */
const HAPPY_MS = 2200;
const MEOW_SRC = "/sounds/meow-cute.m4a";
/** Kept at 5% so a click is a greeting, not a jump scare. */
const MEOW_VOLUME = 0.10;

export default function DevCatMascot() {
  const [docked, setDocked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [typing, setTyping] = useState(false);
  const [happy, setHappy] = useState(false);
  const [hovered, setHovered] = useState(false);

  const typingTimer = useRef<number | undefined>(undefined);
  const happyTimer = useRef<number | undefined>(undefined);
  const meowRef = useRef<HTMLAudioElement | null>(null);

  // Lift the splash. The stylesheet fades it out on the same schedule, so the
  // page is never stuck behind it if this component fails to mount.
  useEffect(() => {
    const id = window.setTimeout(() => setDocked(true), SPLASH_MS);
    return () => window.clearTimeout(id);
  }, []);

  // Read the stored preference after mount: reading during render would
  // disagree with the server-rendered markup.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private mode or blocked storage — fall back to the device default.
    }

    // A visitor's own choice wins everywhere. Without one, phones start with
    // the cat put away: the dock is fixed over the content and screen space is
    // already scarce there.
    if (stored === "1" || stored === "0") {
      setHidden(stored === "1");
      return;
    }
    setHidden(window.matchMedia(MOBILE_QUERY).matches);
  }, []);

  const setHiddenPersisted = useCallback((next: boolean) => {
    setHidden(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Preference simply will not survive a reload.
    }
  }, []);

  // Scrolling means the visitor is reading, so the cat gets back to work.
  useEffect(() => {
    if (!docked || hidden) return;

    const onScroll = () => {
      setTyping(true);
      window.clearTimeout(typingTimer.current);
      typingTimer.current = window.setTimeout(
        () => setTyping(false),
        TYPING_LINGER_MS,
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(typingTimer.current);
    };
  }, [docked, hidden]);

  useEffect(() => () => window.clearTimeout(happyTimer.current), []);

  // Built on the client only, and warmed up so the first click is not silent
  // while the file downloads.
  useEffect(() => {
    const audio = new Audio(MEOW_SRC);
    audio.preload = "auto";
    audio.volume = MEOW_VOLUME;
    meowRef.current = audio;
    return () => {
      audio.pause();
      meowRef.current = null;
    };
  }, []);

  const cheer = () => {
    setHappy(true);
    window.clearTimeout(happyTimer.current);
    happyTimer.current = window.setTimeout(() => setHappy(false), HAPPY_MS);

    const audio = meowRef.current;
    if (!audio) return;
    audio.currentTime = 0; // retrigger from the top on a rapid second click
    audio.volume = MEOW_VOLUME;
    // Rejected when the browser blocks playback or there is no output device —
    // the cat still cheers, just silently.
    void audio.play().catch(() => undefined);
  };

  let state: CatState = "idle";
  if (!docked) state = "loading";
  else if (happy || hovered) state = "happy";
  else if (typing) state = "typing";

  if (!docked) {
    return (
      <div className={styles.splash}>
        <div className={styles.splashInner}>
          <DevCat state="loading" scale={0.9} />
          <span className={styles.bar}>
            <span className={styles.barFill} />
          </span>
        </div>
      </div>
    );
  }

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => setHiddenPersisted(false)}
        className={styles.reopen}
        aria-label="Show the dev cat mascot"
      >
        <span className={styles.pawDot} aria-hidden="true" />
        dev cat
      </button>
    );
  }

  return (
    <div
      className={styles.dock}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={cheer}
    >
      <DevCat state={state} scale={0.5} compact />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setHiddenPersisted(true);
        }}
        className={styles.dockButton}
        aria-label="Hide the dev cat mascot"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  );
}
