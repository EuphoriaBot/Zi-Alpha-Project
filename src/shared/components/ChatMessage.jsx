import styles from "./ChatMessage.module.css"

function ChatMessage({ message }) {
  const isBot = message.type === "bot"

  return (
    <div className={`${styles.message} ${isBot ? styles.bot : styles.user}`}>
      {isBot && <div className={styles.messageAvatar}>🤖</div>}

      <div className={styles.messageBubble}>
        <p>{message.text}</p>
        <span className={styles.messageTime}>{message.time}</span>
      </div>
    </div>
  )
}

export default ChatMessage
