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
    { id: "ziabot", label: "ZiBot", icon: MessageCircle },
    { id: "diskusi", label: "Diskusi", icon: MessageSquare },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User }
  ]

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {

        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon
              size={22}
              strokeWidth={2}
              color={isActive ? "#6C72FF" : "#8B90C7"}
            />

            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
