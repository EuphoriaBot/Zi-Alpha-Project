import { Home, MessageCircle, MessageSquare, Download, User } from 'lucide-react'
import styles from './BottomNav.module.css'

function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'beranda', label: 'Home', icon: Home },
    { id: 'ziabot', label: 'ZiAbot', icon: MessageCircle },
    { id: 'diskusi', label: 'Diskusi', icon: MessageSquare },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon size={22} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav