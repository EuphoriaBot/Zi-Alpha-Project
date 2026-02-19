import { useState } from "react"
import styles from "./Dice.module.css"

export default function Dice({ onRoll }) {
  const [rolling, setRolling] = useState(false)

  const roll = () => {
    if (rolling) return
    setRolling(true)

    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1
      onRoll?.(value)
      setRolling(false)
    }, 600)
  }

  return (
    <button
      type="button"
      className={`${styles.dice} ${rolling ? styles.roll : ""}`}
      onClick={roll}
      disabled={rolling}
    >
      🎲 Roll Dice
    </button>
  )
}
