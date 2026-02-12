import styles from "./BoardTile.module.css"

export default function BoardTile({
  number,
  isPlayer,
  isSnake,
  isLadder,
}) {
  return (
    <div
      className={`${styles.tile}
      ${isSnake ? styles.snake : ""}
      ${isLadder ? styles.ladder : ""}`}
    >
      <span className={styles.number}>{number}</span>
      {isPlayer && <div className={styles.token} />}
    </div>
  )
}
