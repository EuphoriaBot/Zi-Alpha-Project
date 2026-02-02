import { useState } from "react"
import { Dice6 } from "lucide-react"
import styles from "./Dice.module.css"

export default function Dice({ onRoll }) {
  const [rolling, setRolling] = useState(false)

  const roll = () => {
    if (rolling) return
    setRolling(true)

    const value = Math.floor(Math.random() * 6) + 1

    setTimeout(() => {
      onRoll(value)
      setRolling(false)
    }, 600)
  }

  return (
    <button className={styles.diceBtn} onClick={roll}>
      <Dice6 size={28} />
      <span>{rolling ? "Rolling..." : "Roll Dice"}</span>
    </button>
  )
}
