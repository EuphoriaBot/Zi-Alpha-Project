import { useState } from 'react'
import { Plus, Send, ChevronDown, ChevronUp } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'

function ZiaBotScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Halo! Saya ZiA, AI Mentor Anda. Ada yang bisa saya bantu untuk belajar hari ini? 🤖',
      time: '10:30'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isTopicOpen, setIsTopicOpen] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)

  const subjects = [
    { id: 1, icon: '📐', name: 'Matematika', color: '#FF6B6B' },
    { id: 2, icon: '🧪', name: 'IPA', color: '#4ECDC4' },
    { id: 3, icon: '🌍', name: 'IPS', color: '#45B7D1' },
    { id: 4, icon: '📝', name: 'Bahasa Indonesia', color: '#96CEB4' },
    { id: 5, icon: '📺', name: 'Bahasa Inggris', color: '#FFEAA7' },
    { id: 6, icon: '⚡', name: 'Fisika', color: '#DFE6E9' },
    { id: 7, icon: '🧬', name: 'Kimia', color: '#74B9FF' },
    { id: 8, icon: '🦠', name: 'Biologi', color: '#55EFC4' },
  ]

  const classes = [
    { id: 7, name: 'Kelas 7' },
    { id: 8, name: 'Kelas 8' },
    { id: 9, name: 'Kelas 9' },
  ]

  const exampleTopics = [
    "Contoh: Teorema Pythagoras, Fotosintesis...",
    "Teorema Pythagoras",
    "Fotosintesis",
    "Hukum Newton"
  ]

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
        text: `Silakan pilih topik di atas untuk memulai. ZiAbot siap membantumu belajar! 👍`,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleTopicSelect = (topic) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: topic,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: `Baik! Mari kita bahas tentang ${topic}. Apa yang sudah kamu ketahui tentang topik ini? 🎯`,
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
          <h3>ZiAbot</h3>
          <span className="ai-status">AI Study Assistant</span>
        </div>
      </div>

      {/* Description */}
      <div className="ziabot-description">
        <p>ZiAbot membantu kamu belajar step by step. Jawaban bukan untuk langsung disalin, tapi untuk dipahami.</p>
      </div>

      {/* Topic Selection - Expandable */}
      <div className="topic-selection-container">
        <button 
          className="topic-header"
          onClick={() => setIsTopicOpen(!isTopicOpen)}
        >
          <div className="topic-header-content">
            <span className="topic-icon">📚</span>
            <div className="topic-header-text">
              <h4>Pilih Topik</h4>
              <p>Tentukan materi yang ingin dipelajari</p>
            </div>
          </div>
          {isTopicOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isTopicOpen && (
          <div className="topic-content">
            {/* Mata Pelajaran */}
            <div className="topic-section">
              <h5 className="section-title">MATA PELAJARAN</h5>
              <div className="subjects-grid">
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    className={`subject-btn ${selectedSubject === subject.id ? 'active' : ''}`}
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    <span className="subject-icon">{subject.icon}</span>
                    <span className="subject-name">{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kelas */}
            <div className="topic-section">
              <h5 className="section-title">KELAS</h5>
              <div className="class-grid">
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    className={`class-btn ${selectedClass === cls.id ? 'active' : ''}`}
                    onClick={() => setSelectedClass(cls.id)}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Topik/Materi */}
            <div className="topic-section">
              <h5 className="section-title">TOPIK / MATERI</h5>
              <div className="topic-input-container">
                <input
                  type="text"
                  className="topic-input"
                  placeholder="Contoh: Teorema Pythagoras, Fotosintesis..."
                />
              </div>
              <button className="apply-context-btn">
                ✓ Terapkan Konteks
              </button>
            </div>
          </div>
        )}
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