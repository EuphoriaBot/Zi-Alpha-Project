import { MessageCircle, TrendingUp, Clock } from 'lucide-react'
import styles from './DiskusiScreen.module.css'

function DiskusiScreen() {
  const popularQuestions = [
    {
      id: 1,
      title: "Cara menghitung luas segitiga yang tidak beraturan?",
      subject: "Matematika",
      subjectColor: "#5B5FE3",
      author: "oleh Budi Santoso",
      replies: 24,
      trending: true
    },
    {
      id: 2,
      title: "Apa perbedaan sel hewan dan sel tumbuhan?",
      subject: "IPA",
      subjectColor: "#4ECDC4",
      author: "oleh Siti Rahayu",
      replies: 18,
      trending: true
    },
    {
      id: 3,
      title: "Rumus kecepatan, jarak, dan waktu gimana ya?",
      subject: "Fisika",
      subjectColor: "#FF6B6B",
      author: "oleh Rizky Pratama",
      replies: 31,
      trending: true
    }
  ]

  const newQuestions = [
    {
      id: 4,
      title: "Bagaimana cara menggunakan present perfect tense?",
      subject: "Bahasa Inggris",
      subjectColor: "#F7B731",
      author: "oleh Andi Wijaya",
      replies: 12,
      trending: false
    },
    {
      id: 5,
      title: "Siapa tokoh-tokoh penting dalam Sumpah Pemuda?",
      subject: "IPS",
      subjectColor: "#96CEB4",
      author: "oleh Dewi Lestari",
      replies: 8,
      trending: false
    }
  ]

  return (
    <div className={styles.diskusiScreen}>
      {/* Header */}
      <div className={styles.diskusiHeader}>
        <div className={styles.headerIcon}>
          <MessageCircle size={24} color="#fff" />
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>Diskusi Soal</h1>
          <p className={styles.headerSubtitle}>Tanya & Jawab Bersama</p>
        </div>
      </div>

      {/* Popular Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <TrendingUp size={16} color="#FF6B6B" />
          <h2 className={styles.sectionTitle}>POPULER</h2>
        </div>
        <div className={styles.questionsList}>
          {popularQuestions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>
      </div>

      {/* New Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Clock size={16} color="#4ECDC4" />
          <h2 className={styles.sectionTitle}>TERBARU</h2>
        </div>
        <div className={styles.questionsList}>
          {newQuestions.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ title, subject, subjectColor, author, replies, trending }) {
  return (
    <div className={styles.questionCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.questionTitle}>{title}</h3>
        <div className={styles.cardMeta}>
          <span 
            className={styles.subjectTag}
            style={{ backgroundColor: subjectColor }}
          >
            {subject}
          </span>
          <span className={styles.authorText}>{author}</span>
        </div>
        {trending && (
          <div className={styles.trendingBadge}>
            <TrendingUp size={12} />
            <span>Sedang ramai</span>
          </div>
        )}
      </div>
      <div className={styles.cardStats}>
        <MessageCircle size={18} color="#999" />
        <span className={styles.replyCount}>{replies}</span>
      </div>
    </div>
  )
}

export default DiskusiScreen