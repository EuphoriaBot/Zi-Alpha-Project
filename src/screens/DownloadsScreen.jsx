import { Download, Play, CheckCircle, Globe } from 'lucide-react'
import styles from './DownloadsScreen.module.css'

function DownloadsScreen() {
  const downloadedVideos = [
    {
      id: 1,
      title: "Memahami Teorema Pythagoras",
      author: "Pak Ahmad",
      subject: "Kelas 8",
      size: "45 MB",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      status: "ready", // ready, downloading
      progress: 100
    },
    {
      id: 2,
      title: "Fotosintesis: Proses Kehidupan Tumbuhan",
      author: "Bu Sari",
      subject: "Kelas 7",
      size: "52 MB",
      thumbnail: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300&h=200&fit=crop",
      status: "ready",
      progress: 100
    },
    {
      id: 3,
      title: "Hukum Newton dan Gerak",
      author: "Pak Budi",
      subject: "Kelas 9",
      size: "38 MB",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop",
      status: "downloading",
      progress: 65
    }
  ]

  const totalSize = downloadedVideos
    .filter(v => v.status === 'ready')
    .reduce((sum, v) => sum + parseInt(v.size), 0)

  return (
    <div className={styles.downloadsScreen}>
      {/* Header */}
      <div className={styles.downloadsHeader}>
        <div className={styles.headerIcon}>
          <Download size={24} color="#fff" />
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>Downloads</h1>
          <p className={styles.headerSubtitle}>2 Videos • Ready to watch offline</p>
        </div>
      </div>

      {/* Storage Info */}
      <div className={styles.storageInfo}>
        <div className={styles.storageIcon}>
          <Globe size={18} />
        </div>
        <div className={styles.storageText}>
          <span className={styles.storageSize}>{totalSize} MB</span>
          <span className={styles.storageLabel}>Total size</span>
        </div>
      </div>

      {/* Videos List */}
      <div className={styles.videosList}>
        {downloadedVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  )
}

// Video Card Component
function VideoCard({ title, author, subject, size, thumbnail, status, progress }) {
  return (
    <div className={styles.videoCard}>
      {/* Thumbnail */}
      <div className={styles.thumbnailContainer}>
        <img src={thumbnail} alt={title} className={styles.thumbnail} />
        <div className={styles.playOverlay}>
          <Play size={32} color="#fff" fill="#fff" />
        </div>
        {status === 'ready' && (
          <div className={styles.readyBadge}>
            <CheckCircle size={14} />
            <span>Ready to watch</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{title}</h3>
        <div className={styles.videoMeta}>
          <span className={styles.authorName}>{author}</span>
          <span className={styles.metaDot}>•</span>
          <span className={styles.subjectTag}>{subject}</span>
        </div>
        <div className={styles.videoSize}>{size}</div>
      </div>

      {/* Status */}
      {status === 'downloading' && (
        <div className={styles.downloadProgress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.progressInfo}>
            <Download size={14} />
            <span>Downloading...</span>
            <span className={styles.progressPercent}>{progress}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DownloadsScreen