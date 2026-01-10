function ChatMessage({ message }) {
  return (
    <div className={`message ${message.type}`}>
      {message.type === 'bot' && <div className="message-avatar">🤖</div>}
      <div className="message-bubble">
        <p>{message.text}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  )
}

export default ChatMessage