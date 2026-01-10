import { Home, Search, User, MessageCircle } from 'lucide-react'

function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'ziabot', label: 'ZiA-Bot', icon: MessageCircle },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
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