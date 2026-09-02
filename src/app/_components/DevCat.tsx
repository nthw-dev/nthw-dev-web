import styles from "./DevCat.module.css";

export type CatState = "loading" | "typing" | "idle" | "happy";

const statusText: Record<CatState, string> = {
  loading: "booting...",
  typing: "coding...",
  idle: "idle",
  happy: "meow!",
};

/**
 * The mascot itself: pure presentation, driven entirely by `state`.
 * Decorative, so the whole thing is hidden from assistive tech.
 */
export default function DevCat({
  state = "typing",
  scale = 1,
  compact = false,
}: {
  state?: CatState;
  scale?: number;
  /** Crops the floating-code headroom for the corner dock. */
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.stage} ${compact ? styles.compact : ""}`}
      style={{ "--scale": scale } as React.CSSProperties}
    >
      <div className={`${styles.devCat} ${styles[state]}`}>
        <div className={styles.code}>&lt;/&gt;</div>
        <div className={styles.code}>{"{ }"}</div>
        <div className={styles.code}>npm</div>

        <div className={styles.shadow} />

        <div className={styles.cat}>
          <div className={styles.tail} />
          <div className={styles.torso} />
          <div className={styles.belly} />

          <div className={styles.head}>
            <div className={`${styles.ear} ${styles.earLeft}`} />
            <div className={`${styles.ear} ${styles.earRight}`} />

            <div className={`${styles.eye} ${styles.eyeLeft}`} />
            <div className={`${styles.eye} ${styles.eyeRight}`} />

            <div className={styles.nose} />
            <div className={styles.mouth} />

            <div className={`${styles.whisker} ${styles.whiskerLeft}`} />
            <div className={`${styles.whisker} ${styles.whiskerRight}`} />

            <div className={styles.glasses}>
              <div className={`${styles.glass} ${styles.glassLeft}`} />
              <div className={styles.bridge} />
              <div className={`${styles.glass} ${styles.glassRight}`} />
            </div>
          </div>

          <div className={`${styles.arm} ${styles.armLeft}`} />
          <div className={`${styles.arm} ${styles.armRight}`} />
        </div>

        <div className={styles.laptop}>
          <div className={styles.screen}>
            <div className={styles.terminal}>
              <span>const cat = new Dev();</span>
              <span>cat.code();</span>
              <span>cat.eat();</span>
              <span>cat.sleep();</span>
              <span>cat.repeat();</span>
            </div>
          </div>
          <div className={styles.keyboard} />
        </div>

        <div className={styles.status}>
          <span className={styles.dot} />
          {statusText[state]}
        </div>
      </div>
    </div>
  );
}
