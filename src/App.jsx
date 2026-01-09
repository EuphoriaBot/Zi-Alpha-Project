import { useState } from 'react'
import { Home, Search, User, Clock, Bookmark, Share2 } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('beranda')

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Zi-Alpha</h1>
        <div className="profile-icon">
          <User size={20} color="#fff" />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'beranda' && <BerandaScreen />}
        {activeTab === 'search' && <SearchScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'beranda' ? 'active' : ''}`}
          onClick={() => setActiveTab('beranda')}
        >
          <Home size={24} />
          <span>Beranda</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <Search size={24} />
          <span>Search</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={24} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  )
}

// ============================================
// Component: Beranda Screen
// ============================================
function BerandaScreen() {
  const contentData = [
    {
      id: 1,
      title: "Memahami Teorema Pythagoras",
      subject: "MATEMATIKA",
      duration: "5 menit",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Fotosintesis pada Tumbuhan",
      subject: "BIOLOGI",
      duration: "4 menit",
      thumbnail: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Hukum Newton dan Gerak",
      subject: "FISIKA",
      duration: "6 menit",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop",
    },
  ]

  return (
    <div className="beranda-screen">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2 className="welcome-text">Hai, Pelajar! 👋</h2>
        <p className="subtitle-text">Apa yang ingin kamu pelajari hari ini?</p>
      </div>

      {/* Content Cards */}
      <div className="content-list">
        {contentData.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  )
}

// ============================================
// Component: Content Card
// ============================================
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

// ============================================
// Component: Search Screen
// ============================================
function SearchScreen() {
  return (
    <div className="placeholder-screen">
      <Search size={64} color="#ccc" />
      <h2>Search</h2>
      <p>Fitur pencarian akan segera hadir</p>
    </div>
  )
}

// ============================================
// Component: Profile Screen
// ============================================
function ProfileScreen() {
  return (
    <div className="placeholder-screen">
      <User size={64} color="#ccc" />
      <h2>Profile</h2>
      <p>Halaman profil akan segera hadir</p>
    </div>
  )
}

export default App