import { Settings, ArrowLeft, Flame, Award, Zap, Trophy } from 'lucide-react'
import styles from './ProfileScreen.module.css'

function ProfileScreen() {
  const stats = [
    { icon: Flame, label: 'Day Streak', value: '7', color: '#FF9500' },
    { icon: Zap, label: 'Total XP', value: '2,450', color: '#FFD700' },
    { icon: Trophy, label: 'Badges', value: '4', color: '#5B5FE3' },
  ]

  const earnedBadges = [
    {
      id: 1,
      title: 'First Steps',
      icon: '🚀',
      description: 'Menyelesaikan video pertama',
      progress: '1/1',
      unlocked: true,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'Streak Master',
      icon: '🔥',
      description: 'Belajar 7 hari berturut-turut',
      progress: '7/7',
      unlocked: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'Quiz Champion',
      icon: '🎯',
      description: 'Menjawab 50 quiz dengan benar',
      progress: '50/50',
      unlocked: true,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      title: 'Math Wizard',
      icon: '🧙',
      description: 'Menguasai semua materi Matematika',
      progress: '3/5 area',
      unlocked: false,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
  ]

  return (
    <div className={styles.profileScreen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.headerTitle}>Profile</h1>
        <button className={styles.settingsButton}>
          <Settings size={24} />
        </button>
      </div>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>A</span>
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>Riyadi Next President</h2>
            <p className={styles.userLevel}>Level 12</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={styles.levelProgress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '60%' }}></div>
          </div>
          <p className={styles.progressText}>60 XP to next level</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: stat.color }}>
                <Icon size={24} color="#fff" />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Earned Badges Section */}
      <div className={styles.badgesSection}>
        <h3 className={styles.sectionTitle}>EARNED BADGES</h3>
        <div className={styles.badgesGrid}>
          {earnedBadges.map((badge) => (
            <div 
              key={badge.id} 
              className={`${styles.badgeCard} ${!badge.unlocked ? styles.locked : ''}`}
              style={{ background: badge.unlocked ? badge.gradient : '#1E1E2E' }}
            >
              <div className={styles.badgeIcon}>{badge.icon}</div>
              <h4 className={styles.badgeTitle}>{badge.title}</h4>
              <p className={styles.badgeDescription}>{badge.description}</p>
              <p className={styles.badgeProgress}>{badge.progress}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen