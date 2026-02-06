import styles from "./BoardTile.module.css"

export default function BoardTile({ number, isPlayer, isSnake, isLadder }) {
  return (
    <div
      className={`${styles.tile}
      ${isPlayer ? styles.player : ""}
      ${isSnake ? styles.snake : ""}
      ${isLadder ? styles.ladder : ""}`}
    >
      {number}
    </div>
  )
}
