import ContentCard from '../components/ContentCard'
import { contentData } from '../utility/constants'

function BerandaScreen() {
  return (
    <div className="beranda-screen">
      <div className="welcome-section">
        <h2 className="welcome-text">Hai, Pelajar! 👋</h2>
        <p className="subtitle-text">Apa yang ingin kamu pelajari hari ini?</p>
      </div>
      <div className="content-list">
        {contentData.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  )
}

export default BerandaScreen