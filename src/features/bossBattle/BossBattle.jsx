import { useState } from "react"
import BossHpBar from "./BossHpBar"
import PlayerHpBar from "./PlayerHpBar"
import BattleQuiz from "./BattleQuiz"
import BattleLog from "./BattleLog"
import BattleResult from "./BattleResult"
import BossAvatar from "./BossAvatar"
import ComboIndicator from "./ComboIndicator"
import ZiaBotHint from "./ZiaBotHint"

export default function BossBattle() {
  const [bossShield, setBossShield] = useState(60)
  const [bossCore, setBossCore] = useState(100)
  const [playerHp, setPlayerHp] = useState(100)
  const [combo, setCombo] = useState(0)
  const [log, setLog] = useState([])
  const [battleEnd, setBattleEnd] = useState(false)
  const [win, setWin] = useState(false)

  const question = {
    text: "Apa kepanjangan dari HTML?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Hyperlink Mark Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  }

  const handleAnswer = (index) => {
    if (battleEnd) return

    if (index === question.answer) {
      const damage = 20 + combo * 5

      if (bossShield > 0) {
        setBossShield(Math.max(bossShield - damage, 0))
      } else {
        setBossCore(Math.max(bossCore - damage, 0))
      }

      setCombo(combo + 1)
      setLog(prev => [`🔥 Damage ${damage}!`, ...prev])
    } else {
      setPlayerHp(Math.max(playerHp - 15, 0))
      setCombo(0)
      setLog(prev => [`❌ Salah! -15 HP`, ...prev])
    }
  }

  if (bossCore <= 0 && !battleEnd) {
    setBattleEnd(true)
    setWin(true)
  }

  if (playerHp <= 0 && !battleEnd) {
    setBattleEnd(true)
    setWin(false)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔥 Boss Battle Mode</h2>

      <BossAvatar />

      <BossHpBar shield={bossShield} core={bossCore} />
      <PlayerHpBar hp={playerHp} />

      <ComboIndicator combo={combo} />

      {!battleEnd && (
        <>
          <BattleQuiz question={question} onAnswer={handleAnswer} />
          <ZiaBotHint />
        </>
      )}

      <BattleLog log={log} />

      {battleEnd && <BattleResult win={win} />}
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f122e",
    color: "white",
    padding: "30px",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  }
}
