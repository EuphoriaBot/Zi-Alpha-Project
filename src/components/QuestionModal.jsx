import styles from "./QuestionModal.module.css"

export default function QuestionModal({
  data,
  onAnswer,
  onClose,
}) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>{data.title}</h3>
        <p className={styles.question}>{data.question}</p>

        <div className={styles.options}>
          {data.options.map((opt) => (
            <button
              key={opt}
              onClick={() => onAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        <button className={styles.close} onClick={onClose}>
          Batal
        </button>
      </div>
    </div>
  )
}
