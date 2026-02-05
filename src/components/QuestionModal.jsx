import styles from "./QuestionModal.module.css"

export default function QuestionModal({ data, onAnswer }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{data.question}</h3>

        {data.options.map((opt, i) => (
          <button key={i} onClick={() => onAnswer(i)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
