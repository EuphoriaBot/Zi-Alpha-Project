import styles from "./Dice.module.css"

export default function Dice({ onRoll, disabled }) {
  const roll = () => {
    const value = Math.floor(Math.random() * 6) + 1
    onRoll(value)
  }

  return (
    <button
      className={styles.dice}
      onClick={roll}
      disabled={disabled}
    >
      🎲 Roll Dice
    </button>
  )
}
