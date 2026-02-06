import { useState } from "react"
import styles from "./BoardGameScreen.module.css"
import BoardTile from "../components/BoardTile"
import Dice from "../components/Dice"

// konfigurasi ular & tangga
const snakes = {
  18: 5,
  23: 10,
}

const ladders = {
  6: 17,
  9: 21,
}

// materi kelas 6
const materials = [
  { id: 1, name: "Bilangan", points: 1 },
  { id: 2, name: "Pecahan", points: 2 },
  { id: 3, name: "Himpunan", points: 3 },
  { id: 4, name: "Bentuk Aljabar", points: 4 },
  { id: 5, name: "Geometri", points: 5 },
  { id: 6, name: "Perbandingan", points: 6 },
]

export default function BoardGameScreen() {
  const [position, setPosition] = useState(1)
  const [diceValue, setDiceValue] = useState(null)
  const [score, setScore] = useState(0)
  const [showChoice, setShowChoice] = useState(false)

  const handleRoll = (value) => {
    setDiceValue(value)
    setShowChoice(true)
  }

  const handleAnswer = (material) => {
    // simulasi benar (sementara)
    const isCorrect = Math.random() > 0.3

    setScore((prev) =>
      isCorrect ? prev + material.points : prev - material.points
    )

    let nextPos = Math.min(position + diceValue, 25)

    if (ladders[nextPos]) nextPos = ladders[nextPos]
    if (snakes[nextPos]) nextPos = snakes[nextPos]

    setPosition(nextPos)
    setShowChoice(false)
    setDiceValue(null)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edu Board Quest</h2>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {[...Array(25)].map((_, i) => (
            <BoardTile
              key={i}
              number={i + 1}
              isPlayer={position === i + 1}
              isSnake={snakes[i + 1]}
              isLadder={ladders[i + 1]}
            />
          ))}
        </div>
      </div>

      {showChoice && (
        <div className={styles.choiceBox}>
          <p>Pilih Materi:</p>
          <div className={styles.choices}>
            {materials.map((m) => (
              <button key={m.id} onClick={() => handleAnswer(m)}>
                {m.id}. {m.name} (+{m.points})
              </button>
            ))}
          </div>
        </div>
      )}

      <Dice onRoll={handleRoll} disabled={showChoice} />

      <div className={styles.info}>
        <p>Posisi: <strong>{position}</strong></p>
        <p>Skor: <strong>{score}</strong></p>
      </div>
    </div>
  )
}
