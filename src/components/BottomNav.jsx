import { Home, Search, User, MessageCircle } from 'lucide-react'
import styles from './BottomNav.module.css'

function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'ziabot', label: 'ZiA-Bot', icon: MessageCircle },
    { id: 'search', label: 'Search', icon: Search },
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
            <Icon size={24} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav