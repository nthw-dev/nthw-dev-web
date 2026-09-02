"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import DevCat, { type CatState } from "./DevCat";
import styles from "./DevCatMascot.module.css";

const SPLASH_MS = 2000;
const STORAGE_KEY = "devcat-hidden";
/** How long after the last scroll the cat keeps "typing". */
const TYPING_LINGER_MS = 1400;
/** How long a click keeps the cat pleased. */
const HAPPY_MS = 2200;

export default function DevCatMascot() {
  const [docked, setDocked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [typing, setTyping] = useState(false);
  const [happy, setHappy] = useState(false);
  const [hovered, setHovered] = useState(false);

  const typingTimer = useRef<number | undefined>(undefined);
  const happyTimer = useRef<number | undefined>(undefined);

  // Lift the splash. The stylesheet fades it out on the same schedule, so the
  // page is never stuck behind it if this component fails to mount.
  useEffect(() => {
    const id = window.setTimeout(() => setDocked(true), SPLASH_MS);
    return () => window.clearTimeout(id);
  }, []);

  // Read the stored preference after mount: reading during render would
  // disagree with the server-rendered markup.
  useEffect(() => {
    try {
      setHidden(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // Private mode or blocked storage — fall back to showing the cat.
    }
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

  const cheer = () => {
    setHappy(true);
    window.clearTimeout(happyTimer.current);
    happyTimer.current = window.setTimeout(() => setHappy(false), HAPPY_MS);
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
