import { useState } from "react"
import styles from "./BoardGameScreen.module.css"
import Dice from "../components/Dice"
import BoardTile from "../components/BoardTile"

export default function BoardGameScreen() {
  const [position, setPosition] = useState(1)

  const rollDice = (value) => {
    setPosition((prev) => Math.min(prev + value, 25))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edu Board Quest</h2>

      <div className={styles.board}>
        {[...Array(25)].map((_, i) => (
          <BoardTile
            key={i}
            number={i + 1}
            isPlayer={i + 1 === position}
          />
        ))}
      </div>

      <Dice onRoll={rollDice} />

      <p className={styles.info}>
        Posisi kamu: <strong>{position}</strong>
      </p>
    </div>
  )
}
