import styles from './ChatMessage.module.css'

function ChatMessage({ message }) {
  return (
    <div className={`${styles.message} ${styles[message.type]}`}>
      {message.type === 'bot' && (
        <div className={styles.messageAvatar}>🤖</div>
      )}
      <div className={styles.messageBubble}>
        <p>{message.text}</p>
        <span className={styles.messageTime}>{message.time}</span>
      </div>
    </div>
  )
}

export default ChatMessage