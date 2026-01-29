import styles from "./ProgressScreen.module.css"

const ProgressScreen = () => {
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <h2 className={styles.title}>Progress</h2>

      {/* LEVEL CARD */}
      <div className={styles.levelCard}>
        <div className={styles.levelCircle}>
          <span className={styles.levelText}>LEVEL</span>
          <strong className={styles.levelNumber}>12</strong>
        </div>

        <p className={styles.xpText}>⭐ 2,450 XP</p>
        <span className={styles.subText}>550 XP to Level 13</span>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <strong>7</strong>
            <span>Day Streak</span>
          </div>
          <div className={styles.statItem}>
            <strong>185</strong>
            <span>Materi Selesai</span>
          </div>
          <div className={styles.statItem}>
            <strong>450</strong>
            <span>XP Minggu Ini</span>
          </div>
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className={styles.actionCardPrimary}>
        🚀 <span>Boss Battle</span>
        <small>Lawan Concept Boss sekarang</small>
      </div>

      <div className={styles.actionCardSecondary}>
        🧠 <span>Knowledge Arena</span>
        <small>Quiz multiplayer pengetahuan umum</small>
      </div>

      {/* PROGRESS MATA PELAJARAN */}
      <h3 className={styles.sectionTitle}>Progress Mata Pelajaran</h3>

      <div className={styles.subject}>
        <span>Matematika</span>
        <span>72%</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: "72%" }} />
      </div>

      <div className={styles.subject}>
        <span>IPA</span>
        <span>58%</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: "58%" }} />
      </div>

      <div className={styles.subject}>
        <span>IPS</span>
        <span>45%</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: "45%" }} />
      </div>

      <div className={styles.subject}>
        <span>Bahasa Inggris</span>
        <span>33%</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: "33%" }} />
      </div>

      <div className={styles.subject}>
        <span>Bahasa Indonesia</span>
        <span>25%</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: "25%" }} />
      </div>

      {/* ACHIEVEMENTS */}
      <h3 className={styles.sectionTitle}>Achievements</h3>
      <div className={styles.achievements}>
        <div className={styles.badge}>🔥 First Streak</div>
        <div className={styles.badge}>🏆 Quiz Master</div>
        <div className={styles.badge}>⚡ Fast Learner</div>
      </div>
    </div>
  )
}

export default ProgressScreen
