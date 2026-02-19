import { useState } from "react"
import { motion } from "framer-motion"

export function BattleQuiz({ questions, onAnswer }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!questions || questions.length === 0) return null

  const currentQuestion = questions[currentIndex] ?? questions[0]

  const handleOptionClick = (index) => {
    if (!currentQuestion) return

    const isCorrect = index === currentQuestion.correctIndex
    onAnswer?.(isCorrect)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-slate-900 p-5 rounded-2xl border border-slate-700 shadow-xl"
    >
      <h3 className="text-lg font-bold mb-4 text-center">
        {currentQuestion.question}
      </h3>

      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleOptionClick(index)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold"
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default BattleQuiz
