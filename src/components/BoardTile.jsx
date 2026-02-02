import styles from "./BoardTile.module.css"

export default function BoardTile({ number, isPlayer }) {
  return (
    <div className={`${styles.tile} ${isPlayer ? styles.player : ""}`}>
      {number}
    </div>
  )
}
