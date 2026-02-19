import { motion, AnimatePresence } from "framer-motion"
import { Flame } from "lucide-react"

export function ComboIndicator({ comboCount }) {
  if (comboCount === 0) return null

  const bonusDamage = comboCount * 5

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: -20 }}
        className="inline-flex items-center gap-2"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border-2 bg-gradient-to-r from-orange-500 to-red-500 border-orange-300">
          <Flame size={20} className="text-white" />
          <span className="text-white font-bold text-lg">{comboCount}x COMBO</span>
        </div>

        <div className="px-3 py-1 rounded-full bg-emerald-500 border-2 border-emerald-300 text-white font-bold text-sm shadow-lg">
          +{bonusDamage} DMG
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ComboIndicator
