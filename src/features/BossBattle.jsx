import { useState } from "react";
import styles from "./BossBattle.module.css";
import BattleQuiz from "./BattleQuiz";
import BattleLog from "./BattleLog";
import BossAvatar from "./BossAvatar";
import BattleResult from "./BattleResult";

export default function BossBattle() {
  const [logs, setLogs] = useState([]);
  const [bossHP, setBossHP] = useState(100);
  const [playerHP, setPlayerHP] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setBossHP((prev) => {
        const newHP = prev - 20;
        if (newHP <= 0) {
          setVictory(true);
          setGameOver(true);
        }
        return newHP;
      });

      setLogs((prev) => [...prev, "✨ Kamu menyerang Boss!"]);
    } else {
      setPlayerHP((prev) => {
        const newHP = prev - 15;
        if (newHP <= 0) {
          setVictory(false);
          setGameOver(true);
        }
        return newHP;
      });

      setLogs((prev) => [...prev, "💔 Boss menyerang kamu!"]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Boss Battle</h1>

      <BossAvatar bossHP={bossHP} />

      <div className={styles.hpBarContainer}>
        <div className={styles.hpBar}>
          <div
            className={styles.hpFillBoss}
            style={{ width: `${bossHP}%` }}
          />
        </div>
        <div className={styles.hpBar}>
          <div
            className={styles.hpFillPlayer}
            style={{ width: `${playerHP}%` }}
          />
        </div>
      </div>

      {!gameOver && (
        <BattleQuiz onAnswer={handleAnswer} />
      )}

      <BattleLog logs={logs} />

      {gameOver && (
        <BattleResult victory={victory} />
      )}
    </div>
  );
}
