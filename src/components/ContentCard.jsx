import { Clock, Bookmark, Share2 } from 'lucide-react'

function ContentCard({ title, subject, duration, thumbnail }) {
  return (
    <div className="content-card">
      <img src={thumbnail} alt={title} className="card-thumbnail" />
      <div className="card-content">
        <span className="card-subject">{subject}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-footer">
          <div className="duration-badge">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          <div className="action-buttons">
            <button className="icon-button">
              <Bookmark size={18} />
            </button>
            <button className="icon-button">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCard