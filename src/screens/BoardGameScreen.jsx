import { useState } from "react"
import styles from "./BoardGameScreen.module.css"
import BoardTile from "../components/BoardTile"
import Dice from "../components/Dice"

export default function BoardGameScreen() {
  const [position, setPosition] = useState(10)
  const [score, setScore] = useState(1)

  const rollDice = (value) => {
    setPosition((prev) => Math.min(prev + value, 25))
  }

  const snakes = [18]
  const ladders = [6]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edu Board Quest</h2>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {[...Array(25)].map((_, i) => {
            const tile = i + 1
            return (
              <BoardTile
                key={tile}
                number={tile}
                isPlayer={tile === position}
                isSnake={snakes.includes(tile)}
                isLadder={ladders.includes(tile)}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.diceArea}>
        <Dice onRoll={rollDice} />
      </div>

      <div className={styles.info}>
        <span>Posisi: {position}</span>
        <span>Skor: {score}</span>
      </div>
    </div>
  )
}
