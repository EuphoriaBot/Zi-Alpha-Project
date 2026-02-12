import { useBattleEngine } from "../hooks/UseBattleEngine"
import { bossData, playerData, quizData } from "../data/BattleMockData"
import BossAvatar from "../components/BossAvatar"
import BossHpBar from "../components/BossHpBar"
import PlayerHpBar from "../components/PlayerHpBar"
import ComboIndicator from "../components/ComboIndicator"
import BattleLog from "../components/BattleLog"
import BattleResultScreen from "../components/BattleResultScreen"
import BattleQuiz from "../components/BattleQuiz"

export default function ActiveBattlePage() {

  const {
    bossShieldHP,
    bossCoreHP,
    playerHP,
    combo,
    battleLog,
    status,
    handleAnswer
  } = useBattleEngine(bossData, playerData)

  const handleReset = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 text-white p-6 flex flex-col items-center gap-6">

      <BossAvatar />

      <BossHpBar
        shieldHP={bossShieldHP}
        shieldMaxHP={bossData.shield}
        coreHP={bossCoreHP}
        coreMaxHP={bossData.core}
        bossName={bossData.name}
      />

      <ComboIndicator comboCount={combo} />

      <div className="w-full max-w-md">
        <PlayerHpBar
          currentHP={playerHP}
          maxHP={playerData.hp}
          playerName={playerData.name}
        />
      </div>

      {status === "active" && (
        <BattleQuiz
          questions={quizData}
          onAnswer={handleAnswer}
        />
      )}

      <div className="mt-6 w-full max-w-md">
        <BattleLog logs={battleLog} />
      </div>

      {status !== "active" && (
        <BattleResultScreen
          victory={status === "victory"}
          onPlayAgain={handleReset}
        />
      )}

    </div>
  )
}
