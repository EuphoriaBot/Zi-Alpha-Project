import ContentCard from '../components/ContentCard'
import { contentData } from '../utility/constants'
import styles from './BerandaScreen.module.css'

function BerandaScreen() {
  return (
    <div className={styles.berandaScreen}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeText}>Hai, Pelajar! 👋</h2>
        <p className={styles.subtitleText}>Apa yang ingin kamu pelajari hari ini?</p>
      </div>
      <div className={styles.contentList}>
        {contentData.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  )
}

export default BerandaScreen