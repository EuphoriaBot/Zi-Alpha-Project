import { useState } from "react"
import Header from "./shared/components/Header"
import BottomNav from "./shared/components/BottomNav"
import BerandaScreen from "./features/home/BerandaScreen"
import ZiaBotScreen from "./features/ziabot/ZiaBotScreen"
import ExploreScreen from "./features/explore/ExploreScreen"
import ProgressScreen from "./features/progress/ProgressScreen"
import ProfileScreen from "./features/profile/ProfileScreen"

import BoardGameScreen from "./features/boardGame/BoardGameScreen"
import ActiveBattlePage from "./features/bossBattle/pages/ActiveBattlePage"

import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("beranda")

  // optional: biar bottomnav tetap highlight "progress" saat masuk sub-mode
  const navActiveTab =
    activeTab === "bossBattle" || activeTab === "boardGame"
      ? "progress"
      : activeTab

  const renderScreen = () => {
    switch (activeTab) {
      case "beranda":
        return <BerandaScreen />

      case "ziabot":
        return <ZiaBotScreen />

      case "explore":
        return <ExploreScreen />

      case "progress":
        return <ProgressScreen setActiveTab={setActiveTab} />

      case "profile":
        return <ProfileScreen setActiveTab={setActiveTab} />

      // sub-screens dari progress:
      case "bossBattle":
        return <ActiveBattlePage onBack={() => setActiveTab("progress")} />

      case "boardGame":
        return <BoardGameScreen onBack={() => setActiveTab("progress")} />

      default:
        return <BerandaScreen />
    }
  }

  // biar nggak double header (karena Diskusi/Profile/ZiaBot punya header sendiri)
  const showGlobalHeader = activeTab === "beranda"

  return (
    <div className="app-container">
      {showGlobalHeader && <Header />}

      <main className="main-content">{renderScreen()}</main>

      <BottomNav activeTab={navActiveTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
