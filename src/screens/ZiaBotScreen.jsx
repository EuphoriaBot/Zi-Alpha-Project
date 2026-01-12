import { useState } from 'react'
import { Plus, Send, ChevronDown, ChevronUp } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'
import styles from './ZiaBotScreen.module.css'

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
    { id: 1, icon: '📐', name: 'Matematika' },
    { id: 2, icon: '🧪', name: 'IPA' },
    { id: 3, icon: '🌍', name: 'IPS' },
    { id: 4, icon: '📝', name: 'Bahasa Indonesia' },
    { id: 5, icon: '📺', name: 'Bahasa Inggris' },
    { id: 6, icon: '⚡', name: 'Fisika' },
    { id: 7, icon: '🧬', name: 'Kimia' },
    { id: 8, icon: '🦠', name: 'Biologi' },
  ]

  const classes = [
    { id: 7, name: 'Kelas 7' },
    { id: 8, name: 'Kelas 8' },
    { id: 9, name: 'Kelas 9' },
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

  return (
    <div className={styles.ziabotScreen}>
      {/* Header Info */}
      <div className={styles.chatHeaderInfo}>
        <div className={styles.aiAvatar}>🤖</div>
        <div className={styles.aiInfo}>
          <h3>ZiAbot</h3>
          <span className={styles.aiStatus}>AI Study Assistant</span>
        </div>
      </div>

      {/* Description */}
      <div className={styles.ziabotDescription}>
        <p>ZiAbot membantu kamu belajar step by step. Jawaban bukan untuk langsung disalin, tapi untuk dipahami.</p>
      </div>

      {/* Topic Selection */}
      <div className={styles.topicSelectionContainer}>
        <button 
          className={styles.topicHeader}
          onClick={() => setIsTopicOpen(!isTopicOpen)}
        >
          <div className={styles.topicHeaderContent}>
            <span className={styles.topicIcon}>📚</span>
            <div className={styles.topicHeaderText}>
              <h4>Pilih Topik</h4>
              <p>Tentukan materi yang ingin dipelajari</p>
            </div>
          </div>
          {isTopicOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isTopicOpen && (
          <div className={styles.topicContent}>
            {/* Mata Pelajaran */}
            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>MATA PELAJARAN</h5>
              <div className={styles.subjectsGrid}>
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    className={`${styles.subjectBtn} ${selectedSubject === subject.id ? styles.active : ''}`}
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    <span className={styles.subjectIcon}>{subject.icon}</span>
                    <span className={styles.subjectName}>{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kelas */}
            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>KELAS</h5>
              <div className={styles.classGrid}>
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    className={`${styles.classBtn} ${selectedClass === cls.id ? styles.active : ''}`}
                    onClick={() => setSelectedClass(cls.id)}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Topik/Materi */}
            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>TOPIK / MATERI</h5>
              <div className={styles.topicInputContainer}>
                <input
                  type="text"
                  className={styles.topicInput}
                  placeholder="Contoh: Teorema Pythagoras, Fotosintesis..."
                />
              </div>
              <button className={styles.applyContextBtn}>
                ✓ Terapkan Konteks
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className={styles.chatMessages}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className={styles.typingContainer}>
            <div className={styles.messageAvatar}>🤖</div>
            <div className={styles.typingBubble}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={styles.chatInputContainer}>
        <button className={styles.attachBtn}>
          <Plus size={20} />
        </button>
        <input 
          type="text"
          className={styles.chatInput}
          placeholder="Tanya ZiA sesuatu..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className={styles.sendBtn} onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

export default ZiaBotScreen