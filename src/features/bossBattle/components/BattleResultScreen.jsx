import { motion } from "framer-motion"

export function BattleResultScreen({ victory, onPlayAgain }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-slate-950/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
        <h2
          className={`text-2xl font-bold mb-4 ${
            victory ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {victory ? "🎉 Kemenangan!" : "💔 Kalah..."}
        </h2>

        <button
          type="button"
          onClick={onPlayAgain}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-xl"
        >
          Main Lagi
        </button>
      </div>
    </motion.div>
  )
}

export default BattleResultScreen
