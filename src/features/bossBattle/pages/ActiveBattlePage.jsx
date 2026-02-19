import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { useBattleEngine } from "../hooks/useBattleEngine"
import { bossData, playerData, quizData } from "../data/battleMockData"

import BossAvatar from "../components/BossAvatar"
import BossHpBar from "../components/BossHpBar"
import PlayerHpBar from "../components/PlayerHpBar"
import ComboIndicator from "../components/ComboIndicator"
import BattleLog from "../components/BattleLog"
import BattleResultScreen from "../components/BattleResultScreen"
import BattleQuiz from "../components/BattleQuiz"

export default function ActiveBattlePage({ onBack }) {
  // trick: remount battle scene untuk reset tanpa reload
  const [battleKey, setBattleKey] = useState(0)

  return (
    <BattleScene
      key={battleKey}
      onBack={onBack}
      onPlayAgain={() => setBattleKey((k) => k + 1)}
    />
  )
}

function BattleScene({ onBack, onPlayAgain }) {
  const {
    bossShieldHP,
    bossCoreHP,
    playerHP,
    combo,
    battleLog,
    status,
    handleAnswer
  } = useBattleEngine(bossData, playerData)

  return (
    <div className="relative flex flex-col items-center gap-6 text-white p-6 bg-gradient-to-b from-slate-950 to-indigo-950 min-h-full">
      {/* Header kecil */}
      <div className="w-full max-w-md flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
          aria-label="Kembali"
          style={{ visibility: onBack ? "visible" : "hidden" }}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="font-bold">Boss Battle</div>

        <div className="w-10 h-10" />
      </div>

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
        <BattleQuiz questions={quizData} onAnswer={handleAnswer} />
      )}

      <div className="mt-2 w-full max-w-md">
        <BattleLog logs={battleLog} />
      </div>

      {status !== "active" && (
        <BattleResultScreen
          victory={status === "victory"}
          onPlayAgain={onPlayAgain}
        />
      )}
    </div>
  )
}
