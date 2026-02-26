import styles from "./ProgressScreen.module.css"
import {
  Flame,
  Target,
  Star,
  Swords,
  Brain,
  Gamepad2,
  Dice6,
  ChevronRight,
  BarChart3,
  Trophy,
} from "lucide-react"

export default function ProgressScreen({ setActiveTab }) {
  const achievements = [
    { icon: "🚀", label: "Fast Start" },
    { icon: "🏆", label: "Champion" },
    { icon: "🔥", label: "On Fire" },
    { icon: "📘", label: "Scholar" },
    { icon: "⚡", label: "Quick Thinker" },
    { icon: "🧠", label: "Deep Learner" },
    { icon: "🎯", label: "Accuracy" },
    { icon: "💎", label: "Rare Badge" },
    { icon: "👑", label: "Top Rank" },
  ]

  return (
    <div className={styles.container}>
      {/* TOP HEADER */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleRow}>
          <div className={styles.pageIcon}>
            <BarChart3 size={18} />
          </div>
          <div className={styles.pageTitle}>Progress</div>
        </div>
      </div>

      {/* OVERVIEW CARD */}
      <div className={styles.overviewCard}>
        <div className={styles.levelRow}>
          <div className={styles.levelRing}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" />
              <circle cx="30" cy="30" r="26" className={styles.progressCircle} />
            </svg>
            <span>12</span>
          </div>

          <div className={styles.levelInfo}>
            <div className={styles.xpLine}>
              <strong>2,450</strong>
              <span className={styles.xpUnit}>XP</span>
            </div>

            <p className={styles.levelSub}>50 XP ke Level 13</p>

            <div className={styles.progressBar}>
              <div className={styles.progressFill} />
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className={styles.statsRow}>
          <Stat icon={<Flame size={18} />} value="7" label="Hari Streak" />
          <Stat icon={<Target size={18} />} value="185" label="Misi Selesai" />
          <Stat icon={<Star size={18} />} value="450" label="XP Minggu Ini" />
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className={styles.actions}>
        <ActionCard
          icon={<Swords size={18} />}
          title="Boss Battle"
          desc="Latihan Concept Boss sekarang"
          variant="boss"
          onClick={() => setActiveTab?.("bossBattle")}
        />

        <ActionCard
          icon={<Brain size={18} />}
          title="Knowledge Arena"
          desc="Turbo Racing & Tug-of-War"
          variant="arena"
        />

        <ActionCard
          icon={<Gamepad2 size={18} />}
          title="Fun Games"
          desc="Memory, Logic, Pattern & lainnya"
          variant="games"
        />

        <ActionCard
          icon={<Dice6 size={18} />}
          title="Edu Board Quest"
          desc="Gamifikasi ala Ular Tangga"
          variant="board"
          onClick={() => setActiveTab?.("boardGame")}
        />
      </div>

      {/* ACHIEVEMENTS */}
      <div className={styles.achHeader}>
        <div className={styles.achTitle}>ACHIEVEMENTS</div>
        <div className={styles.achCount}>
          <Trophy size={14} />
          <span>48</span>
        </div>
      </div>

      <div className={styles.achievementsStrip}>
        {achievements.map((a) => (
          <Achievement key={`${a.icon}-${a.label}`} icon={a.icon} label={a.label} />
        ))}
      </div>
    </div>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

function ActionCard({ icon, title, desc, variant, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.actionCard} ${styles[variant]}`}
      onClick={onClick}
    >
      <div className={styles.actionIcon}>{icon}</div>

      <div className={styles.actionText}>
        <div className={styles.actionTitle}>{title}</div>
        <div className={styles.actionDesc}>{desc}</div>
      </div>

      <ChevronRight className={styles.chev} />
    </button>
  )
}

function Achievement({ icon, label }) {
  return (
    <div className={styles.badge}>
      <div className={styles.badgeIcon}>{icon}</div>
      <div className={styles.badgeLabel}>{label}</div>
    </div>
  )
}