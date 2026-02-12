import { Clock, Bookmark, Share2 } from 'lucide-react'
import styles from './ContentCard.module.css'

function ContentCard({ title, subject, duration, thumbnail }) {
  return (
    <div className={styles.contentCard}>
      <img src={thumbnail} alt={title} className={styles.cardThumbnail} />
      <div className={styles.cardContent}>
        <span className={styles.cardSubject}>{subject}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardFooter}>
          <div className={styles.durationBadge}>
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.iconButton}>
              <Bookmark size={18} />
            </button>
            <button className={styles.iconButton}>
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCard