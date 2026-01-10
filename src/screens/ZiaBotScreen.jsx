import { useState } from 'react'
import { Plus, Send } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'
import { quickTopics, initialMessages } from '../utility/constants'

function ZiaBotScreen() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (inputText.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, userMessage])
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Pertanyaan bagus! Untuk memahami topik ini dengan lebih baik, coba pikirkan: Apa yang sudah kamu ketahui tentang hal ini? Mari kita eksplorasi bersama! 🎯',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="ziabot-screen">
      {/* Header Info */}
      <div className="chat-header-info">
        <div className="ai-avatar">🤖</div>
        <div className="ai-info">
          <h3>ZiA - AI Mentor</h3>
          <span className="ai-status">● Aktif</span>
        </div>
      </div>

      {/* Quick Topics */}
      <div className="quick-topics">
        <p className="quick-topics-title">Mata Pelajaran</p>
        <div className="topics-grid">
          {quickTopics.map(topic => (
            <button key={topic.id} className="topic-btn">
              <span className="topic-icon">{topic.icon}</span>
              <span className="topic-name">{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="message-avatar">🤖</div>
            <div className="message-bubble typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <button className="attach-btn">
          <Plus size={20} />
        </button>
        <input 
          type="text"
          className="chat-input"
          placeholder="Tanya ZiA sesuatu..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

export default ZiaBotScreen