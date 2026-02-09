import styles from "./ProgressScreen.module.css"
import {
  Flame,
  Target,
  Star,
  Swords,
  Brain,
  Gamepad2,
  Dice6,
  ChevronRight
} from "lucide-react"

export default function ProgressScreen({ setActiveTab }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Progress</h2>

      {/* LEVEL CARD */}
      <div className={styles.levelCard}>
        <div className={styles.levelRing}>
          <svg width="60" height="60">
            <circle cx="30" cy="30" r="26" />
            <circle cx="30" cy="30" r="26" className={styles.progressCircle} />
          </svg>
          <span>12</span>
        </div>

        <div className={styles.levelInfo}>
          <strong>2,450 XP</strong>
          <p>50 XP lagi ke Level 13</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        <Stat icon={<Flame />} value="7" label="Streak" />
        <Stat icon={<Target />} value="185" label="Missions" />
        <Stat icon={<Star />} value="450" label="XP" />
      </div>

      {/* ACTION CARDS */}
      <ActionCard
        icon={<Swords />}
        title="Boss Battle"
        desc="Latihan Concept Boss sekarang"
        variant="boss"
      />

      <ActionCard
        icon={<Brain />}
        title="Knowledge Arena"
        desc="Turbo Racing & Tug-of-War"
        variant="arena"
      />

      <ActionCard
        icon={<Gamepad2 />}
        title="Fun Games"
        desc="Memory, Logic, Pattern & Math"
        variant="games"
      />

      <ActionCard
        icon={<Dice6 />}
        title="Edu Board Quest"
        desc="Gamifikasi ala Ular Tangga"
        variant="board"
        onClick={() => setActiveTab("board")}
      />

      {/* ACHIEVEMENTS */}
      <h3 className={styles.subTitle}>Achievements</h3>
      <div className={styles.achievements}>
        <Achievement icon="🚀" label="Fast Start" />
        <Achievement icon="🏆" label="Champion" />
        <Achievement icon="🔥" label="On Fire" />
        <Achievement icon="📘" label="Scholar" />
      </div>
    </div>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className={styles.statBox}>
      {icon}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function ActionCard({ icon, title, desc, variant, onClick }) {
  return (
    <div
      className={`${styles.actionCard} ${styles[variant]}`}
      onClick={onClick}
    >
      <div className={styles.iconBox}>{icon}</div>
      <div className={styles.text}>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      <ChevronRight />
    </div>
  )
}

function Achievement({ icon, label }) {
  return (
    <div className={styles.badge}>
      <span>{icon}</span>
      <p>{label}</p>
    </div>
  )
}
