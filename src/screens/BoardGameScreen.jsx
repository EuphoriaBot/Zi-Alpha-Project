import { useState } from "react"
import styles from "./BoardGameScreen.module.css"
import Dice from "../components/Dice"
import BoardTile from "../components/BoardTile"
import QuestionModal from "../components/QuestionModal"

import { snakesAndLadders, questionTiles } from "../data/BoardRules"
import { questions } from "../data/Questions"

export default function BoardGameScreen() {
  const [position, setPosition] = useState(1)
  const [question, setQuestion] = useState(null)
  const [message, setMessage] = useState("")

  const movePlayer = (steps) => {
    let next = Math.min(position + steps, 25)

    // ular / tangga
    if (snakesAndLadders[next]) {
      next = snakesAndLadders[next]
      setMessage("🐍🪜 Kena ular / tangga!")
    }

    // soal
    if (questionTiles.includes(next)) {
      const q = questions[Math.floor(Math.random() * questions.length)]
      setQuestion({ ...q, tile: next })
    }

    setPosition(next)
  }

  const handleAnswer = (index) => {
    if (index !== question.answer) {
      setPosition((p) => Math.max(p - 1, 1))
      setMessage("❌ Salah! Mundur 1 langkah")
    } else {
      setMessage("✅ Benar! Lanjutkan")
    }
    setQuestion(null)
  }

  return (
    <div className={styles.container}>
      <h2>Edu Board Quest</h2>

      <div className={styles.board}>
        {[...Array(25)].map((_, i) => (
          <BoardTile
            key={i}
            number={i + 1}
            isPlayer={i + 1 === position}
          />
        ))}
      </div>

      <Dice onRoll={movePlayer} />

      <p className={styles.info}>{message}</p>

      {position === 25 && (
        <p className={styles.win}>🎉 Kamu Menang!</p>
      )}

      {question && (
        <QuestionModal data={question} onAnswer={handleAnswer} />
      )}
    </div>
  )
}
