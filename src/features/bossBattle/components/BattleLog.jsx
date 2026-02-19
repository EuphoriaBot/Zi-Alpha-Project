import { motion, AnimatePresence } from "framer-motion"

export function BattleLog({ logs }) {
  const recentLogs = logs.slice(-2) // karena sekarang log ditambah di belakang

  return (
    <div className="flex flex-col gap-2 items-center min-h-[50px] justify-end">
      <AnimatePresence mode="popLayout">
        {recentLogs.map((log, index) => {
          const isLatest = index === recentLogs.length - 1

          return (
            <motion.div
              key={`${index}-${log}`}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{
                opacity: isLatest ? 1 : 0.6,
                y: 0,
                scale: isLatest ? 1 : 0.95
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="text-center"
            >
              <span className="text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg bg-slate-800/90 text-slate-100 border-2 border-slate-600">
                {log}
              </span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default BattleLog
