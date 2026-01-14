import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import BerandaScreen from './screens/BerandaScreen'
import ZiaBotScreen from './screens/ZiaBotScreen'
import DiskusiScreen from './screens/DiskusiScreen'
import SearchScreen from './screens/SearchScreen'
import ProfileScreen from './screens/ProfileScreen'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('beranda')

  const renderScreen = () => {
    switch(activeTab) {
      case 'beranda':
        return <BerandaScreen />
      case 'ziabot':
        return <ZiaBotScreen />
      case 'diskusi':
        return <DiskusiScreen />
      case 'search':
        return <SearchScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <BerandaScreen />
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App