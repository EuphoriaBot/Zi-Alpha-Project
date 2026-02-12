import styles from "./BoardOverlay.module.css"

export default function BoardOverlay() {
  return (
    <svg viewBox="0 0 100 100" className={styles.overlay}>
      {/* LADDER 6 -> 17 */}
      <line x1="22" y1="70" x2="62" y2="34" />
      <line x1="26" y1="70" x2="66" y2="34" />

      {/* SNAKE 18 -> 5 */}
      <path d="M78 28 C68 38, 88 48, 70 62 C52 76, 78 90, 58 94" />
    </svg>
  )
}
