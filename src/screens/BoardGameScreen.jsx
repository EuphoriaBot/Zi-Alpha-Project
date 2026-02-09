import { useState } from "react"
import styles from "./BoardGameScreen.module.css"
import BoardTile from "../components/BoardTile"
import Dice from "../components/Dice"
import BoardOverlay from "../components/BoardOverlay"
import QuestionModal from "../components/QuestionModal"
import questions from "../data/Questions"

export default function BoardGameScreen() {
  const [position, setPosition] = useState(1)
  const [score, setScore] = useState(0)
  const [diceValue, setDiceValue] = useState(null)
  const [showQuestion, setShowQuestion] = useState(false)

  const snakes = { 18: 5 }
  const ladders = { 6: 17 }

  const rollDice = (value) => {
    setDiceValue(value)
    setShowQuestion(true)
  }

  const handleAnswer = (selected) => {
    const q = questions[diceValue]
    let newScore = score
    let newPos = Math.min(position + diceValue, 25)

    if (selected === q.answer) {
      newScore += q.point
    } else {
      newScore -= q.point
    }

    if (snakes[newPos]) newPos = snakes[newPos]
    if (ladders[newPos]) newPos = ladders[newPos]

    setScore(newScore)
    setPosition(newPos)
    setShowQuestion(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edu Board Quest</h2>

      <div className={styles.boardWrapper}>
        <div className={styles.boardContainer}>
          <BoardOverlay />
          <div className={styles.board}>
            {[...Array(25)].map((_, i) => {
              const tile = i + 1
              return (
                <BoardTile
                  key={tile}
                  number={tile}
                  isPlayer={tile === position}
                  isSnake={snakes[tile]}
                  isLadder={ladders[tile]}
                />
              )
            })}
          </div>
        </div>
      </div>

      <Dice onRoll={rollDice} />

      <div className={styles.info}>
        <span>Posisi: {position}</span>
        <span>Skor: {score}</span>
      </div>

      {showQuestion && (
        <QuestionModal
          data={questions[diceValue]}
          onAnswer={handleAnswer}
          onClose={() => setShowQuestion(false)}
        />
      )}
    </div>
  )
}
