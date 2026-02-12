import {
  Home,
  MessageCircle,
  MessageSquare,
  BarChart3,
  User
} from "lucide-react"

import styles from "./BottomNav.module.css"

function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "beranda", label: "Home", icon: Home },
    { id: "ziabot", label: "ZiAbot", icon: MessageCircle },
    { id: "diskusi", label: "Diskusi", icon: MessageSquare },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User }
  ]

  const handleNavigation = (id) => {
    if (activeTab !== id) {
      setActiveTab(id)
    }
  }

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const Icon = item.icon

        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.navItem} ${
              activeTab === item.id ? styles.active : ""
            }`}
            onClick={() => handleNavigation(item.id)}
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
