import { motion } from "framer-motion"

export function BossHpBar({
  shieldHP,
  shieldMaxHP,
  coreHP,
  coreMaxHP,
  bossName
}) {

  const shieldPercentage = Math.max(0, (shieldHP / shieldMaxHP) * 100)
  const corePercentage = Math.max(0, (coreHP / coreMaxHP) * 100)

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-50">{bossName}</h3>
        <span className="text-purple-400 font-semibold">
          {coreHP} / {coreMaxHP}
        </span>
      </div>

      {shieldHP > 0 && (
        <div className="mb-2">
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              animate={{ width: `${shieldPercentage}%` }}
            />
          </div>
        </div>
      )}

      <div className="h-6 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500"
          animate={{ width: `${corePercentage}%` }}
        />
      </div>

    </div>
  )
}

export default BossHpBar
