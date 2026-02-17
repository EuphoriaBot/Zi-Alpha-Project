import { useState } from "react"
import Header from "./shared/components/Header"
import BottomNav from "./shared/components/BottomNav"

import BerandaScreen from "./features/home/BerandaScreen"
import ZiAbotScreen from "./features/ziabot/ZiAbotScreen"
import DiskusiScreen from "./features/discussion/DiskusiScreen"
import ProgressScreen from "./features/progress/ProgressScreen"
import ProfileScreen from "./features/profile/ProfileScreen"

import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("beranda")

  const renderScreen = () => {
    switch (activeTab) {
      case "beranda":
        return <BerandaScreen />

      case "ziabot":
        return <ZiAbotScreen />

      case "diskusi":
        return <DiskusiScreen />

      case "progress":
        return <ProgressScreen />

      case "profile":
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

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

    </div>
  )
}

export default App
