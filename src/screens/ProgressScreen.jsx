import styles from "./ProgressScreen.module.css"
import { Flame, Target, Star, Swords, Brain, Gamepad2 } from "lucide-react"

export default function ProgressScreen() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Progress</h2>

      {/* LEVEL CARD */}
      <div className={styles.levelCard}>
        <div className={styles.levelCircle}>12</div>

        <div className={styles.levelInfo}>
          <h3>2,450 XP</h3>
          <p>50 XP lagi ke Level 13</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <Flame size={18} />
          <strong>7</strong>
          <span>Streak</span>
        </div>
        <div className={styles.statBox}>
          <Target size={18} />
          <strong>185</strong>
          <span>Missions</span>
        </div>
        <div className={styles.statBox}>
          <Star size={18} />
          <strong>450</strong>
          <span>XP Earned</span>
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className={`${styles.actionCard} ${styles.boss}`}>
        <Swords />
        <div>
          <h4>Boss Battle</h4>
          <p>Latihan Concept Boss sekarang</p>
        </div>
      </div>

      <div className={`${styles.actionCard} ${styles.arena}`}>
        <Brain />
        <div>
          <h4>Knowledge Arena</h4>
          <p>Turbo Racing & Tug-of-War</p>
        </div>
      </div>

      <div className={`${styles.actionCard} ${styles.games}`}>
        <Gamepad2 />
        <div>
          <h4>Fun Games</h4>
          <p>Memory, Logic, Pattern & Math</p>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <h3 className={styles.subTitle}>Achievements</h3>
      <div className={styles.achievements}>
        <div className={styles.badge}>🚀</div>
        <div className={styles.badge}>🏆</div>
        <div className={styles.badge}>🔥</div>
        <div className={styles.badge}>📘</div>
      </div>
    </div>
  )
}
