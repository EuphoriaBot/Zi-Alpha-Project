import { useState } from "react"
import Header from "./shared/components/Header"
import BottomNav from "./shared/components/BottomNav"
import BerandaScreen from "./features/home/BerandaScreen"
import ZiaBotScreen from "./features/ziabot/ZiaBotScreen"
import DiskusiScreen from "./features/discussion/DiskusiScreen"
import ProgressScreen from "./features/progress/ProgressScreen"
import ProfileScreen from "./features/profile/ProfileScreen"
import BoardGameScreen from "./features/boardGame/BoardGameScreen"
import ActiveBattlePage from "./features/bossBattle/pages/ActiveBattlePage"

import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("beranda")

  const renderScreen = () => {
    switch (activeTab) {
      case "beranda":
        return <BerandaScreen setActiveTab={setActiveTab} />
      case "ziabot":
        return <ZiaBotScreen />
      case "diskusi":
        return <DiskusiScreen />
      case "progress":
        return <ProgressScreen setActiveTab={setActiveTab} />
      case "board":
        return <BoardGameScreen />
      case "profile":
        return <ProfileScreen />
      case "bossBattle":
        return <ActiveBattlePage setActiveTab={setActiveTab} />
      default:
        return <BerandaScreen setActiveTab={setActiveTab} />
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
