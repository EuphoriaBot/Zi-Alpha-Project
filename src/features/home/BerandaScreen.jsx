import { useState, useRef } from 'react'
import { contentData } from '../../shared/data/contentData'
import styles from './BerandaScreen.module.css'

function BerandaScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const totalContent = contentData?.length || 0
  const currentContent = contentData[currentIndex]

  /* =======================
     TOUCH / SWIPE HANDLER
  ======================== */
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current

    if (swipeDistance > 50 && currentIndex < totalContent - 1) {
      setCurrentIndex((prev) => prev + 1)
    }

    if (swipeDistance < -50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  /* =======================
     DESKTOP SCROLL
  ======================== */
  const handleWheel = (e) => {
    e.preventDefault()

    if (e.deltaY > 0 && currentIndex < totalContent - 1) {
      setCurrentIndex((prev) => prev + 1)
    }

    if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  /* =======================
     EMPTY STATE (ANTI CRASH)
  ======================== */
  if (!totalContent) {
    return (
      <div className={styles.berandaScreen}>
        <div className={styles.contentArea}>
          <div className={styles.videoBackground} />
          <div className={styles.contentInfo}>
            <h2 className={styles.videoTitle}>Belum ada konten</h2>
            <p className={styles.videoMeta}>Tambahkan contentData dulu</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={styles.berandaScreen}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className={styles.contentArea}>
        {/* ===== Background / Video ===== */}
        <div className={styles.videoBackground}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.videoIcon}>▶</div>
          </div>
        </div>

        {/* ===== Content Info ===== */}
        {currentContent && (
          <div className={styles.contentInfo}>
            <h2 className={styles.videoTitle}>
              {currentContent.title}
            </h2>
            <p className={styles.videoMeta}>
              {currentContent.author} • {currentContent.level} • {currentContent.duration}
            </p>
          </div>
        )}

        {/* ===== Action Buttons ===== */}
        <div className={styles.actionButtons}>
          <button className={styles.actionBtn}>
            <div className={styles.actionIcon}>❤️</div>
            <span className={styles.actionLabel}>
              {currentContent?.stats?.likes ?? 0}
            </span>
          </button>

          <button className={styles.actionBtn}>
            <div className={styles.actionIcon}>💬</div>
            <span className={styles.actionLabel}>
              {currentContent?.stats?.comments ?? 0}
            </span>
          </button>

          <button className={styles.actionBtn}>
            <div className={styles.actionIcon}>📌</div>
            <span className={styles.actionLabel}>Save</span>
          </button>

          <button className={styles.actionBtn}>
            <div className={styles.actionIcon}>↗️</div>
            <span className={styles.actionLabel}>Share</span>
          </button>

          <button className={`${styles.actionBtn} ${styles.aiBtn}`}>
            <div className={styles.actionIcon}>🤖</div>
            <span className={styles.actionLabel}>ZiAbot</span>
          </button>
        </div>

        {/* ===== Progress Indicator ===== */}
        <div className={styles.progressIndicator}>
          {contentData.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                index === currentIndex ? styles.active : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BerandaScreen
