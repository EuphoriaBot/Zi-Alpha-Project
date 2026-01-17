import { useState, useRef } from 'react'
import { contentData } from '../utility/constants'
import styles from './BerandaScreen.module.css'

function BerandaScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const currentContent = contentData[currentIndex]

  // Handle touch/swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current
    
    // Swipe up (next content)
    if (swipeDistance > 50 && currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    // Swipe down (previous content)
    else if (swipeDistance < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Handle wheel scroll for desktop
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY > 0 && currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div 
      className={styles.berandaScreen}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Main Content Area - Full Screen */}
      <div className={styles.contentArea}>
        {/* Video/Content Background */}
        <div className={styles.videoBackground}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.videoIcon}>▶</div>
          </div>
        </div>

        {/* Content Info - Bottom Left */}
        <div className={styles.contentInfo}>
          <h2 className={styles.videoTitle}>{currentContent.title}</h2>
          <p className={styles.videoMeta}>
            {currentContent.author} • {currentContent.level} • {currentContent.duration}
          </p>
        </div>

        {/* Action Buttons - Right Side */}
        <div className={styles.actionButtons}>
          <button className={styles.actionBtn}>
            <div className={styles.actionIcon}>❤️</div>
            <span className={styles.actionLabel}>1.2K</span>
          </button>

          <button className={styles.actionBtn}>
            <div className={styles.actionIcon}>💬</div>
            <span className={styles.actionLabel}>234</span>
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

        {/* Progress Indicator - Right Middle */}
        <div className={styles.progressIndicator}>
          {contentData.map((_, index) => (
            <div 
              key={index}
              className={`${styles.progressDot} ${index === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BerandaScreen