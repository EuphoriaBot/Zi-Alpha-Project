import { motion } from "framer-motion"

export function PlayerHpBar({
  currentHP,
  maxHP,
  playerName
}) {

  const hpPercentage = Math.max(0, (currentHP / maxHP) * 100)

  return (
    <div className="p-3 rounded-xl border bg-slate-900/50 border-emerald-500/30">

      <p className="text-sm font-semibold text-slate-50 mb-2">
        {playerName}
      </p>

      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
          animate={{ width: `${hpPercentage}%` }}
        />
      </div>

      <p className="text-xs text-slate-400 mt-1">
        {currentHP} / {maxHP}
      </p>

    </div>
  )
}

export default PlayerHpBar
