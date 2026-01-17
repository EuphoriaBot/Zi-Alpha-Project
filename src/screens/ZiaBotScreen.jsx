import { useState } from 'react'
import { ChevronDown, ChevronUp, Send, Paperclip } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'
import { initialMessages } from '../utility/constants'
import styles from './ZiaBotScreen.module.css'

export default function ZiaBotScreen() {
  const [topicOpen, setTopicOpen] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [topicInput, setTopicInput] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  const subjects = [
    { id: 'matematika', name: 'Matematika', icon: '📐' },
    { id: 'ipa', name: 'IPA', icon: '🧪' },
    { id: 'ips', name: 'IPS', icon: '🌍' },
    { id: 'bahasa-indonesia', name: 'Bahasa Indonesia', icon: '📖' },
    { id: 'bahasa-inggris', name: 'Bahasa Inggris', icon: '🇬🇧' },
    { id: 'fisika', name: 'Fisika', icon: '⚡' },
    { id: 'kimia', name: 'Kimia', icon: '🧬' },
    { id: 'biologi', name: 'Biologi', icon: '🌿' },
  ]

  const classes = ['Kelas 7', 'Kelas 8', 'Kelas 9']

  const getCurrentTime = () => {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  const applyContext = () => {
    if (!selectedSubject && !selectedClass && !topicInput) return
    
    let contextMsg = '✓ Konteks diterapkan: '
    const parts = []
    if (selectedSubject) parts.push(subjects.find(s => s.id === selectedSubject)?.name)
    if (selectedClass) parts.push(selectedClass)
    if (topicInput) parts.push(`"${topicInput}"`)
    contextMsg += parts.join(', ')
    
    const newMessage = {
      id: messages.length + 1,
      type: 'bot',
      text: contextMsg,
      time: getCurrentTime()
    }
    
    setMessages(prev => [...prev, newMessage])
    setTopicOpen(false)
  }

  const send = () => {
    if (!input.trim()) return
    
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      time: getCurrentTime()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    
    // Simulate bot typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Terima kasih atas pertanyaannya! Saya sedang memproses jawaban terbaik untuk Anda...',
        time: getCurrentTime()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1500)
  }

  return (
    <div className={styles.ziabotScreen}>
      {/* Chat Header Info */}
      <div className={styles.chatHeaderInfo}>
        <div className={styles.aiAvatar}>🤖</div>
        <div className={styles.aiInfo}>
          <h3>ZiAbot</h3>
          <span className={styles.aiStatus}>AI Study Assistant</span>
        </div>
      </div>

      {/* Description */}
      <div className={styles.ziabotDescription}>
        <p>ZiAbot membantu kamu belajar step by step. Jawaban bukan untuk langsung dikasih, tapi untuk dipahami.</p>
      </div>

      {/* Topic Selection */}
      <div className={styles.topicSelectionContainer}>
        <button
          className={styles.topicHeader}
          onClick={() => setTopicOpen(!topicOpen)}
        >
          <div className={styles.topicHeaderContent}>
            <span className={styles.topicIcon}>📚</span>
            <div className={styles.topicHeaderText}>
              <h4>Pilih Topik</h4>
              <p>Tentukan materi yang ingin dipelajari</p>
            </div>
          </div>
          {topicOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {topicOpen && (
          <div className={styles.topicContent}>
            {/* Subjects */}
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

            {/* Class */}
            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>KELAS</h5>
              <div className={styles.classGrid}>
                {classes.map(cls => (
                  <button
                    key={cls}
                    className={`${styles.classBtn} ${selectedClass === cls ? styles.active : ''}`}
                    onClick={() => setSelectedClass(cls)}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>TOPIK / MATERI</h5>
              <div className={styles.topicInputContainer}>
                <input
                  type="text"
                  className={styles.topicInput}
                  placeholder="Contoh: Teorema Pythagoras, Fotosintesis..."
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                />
              </div>
            </div>

            {/* Apply Button */}
            <button className={styles.applyContextBtn} onClick={applyContext}>
              ✓ Terapkan Konteks
            </button>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className={styles.chatMessages}>
        {messages.map((message) => (
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

      {/* Chat Input */}
      <div className={styles.chatInputContainer}>
        <button className={styles.attachBtn}>
          <Paperclip size={20} />
        </button>
        <input
          className={styles.chatInput}
          placeholder="Tanya ZiA sesuatu..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className={styles.sendBtn} onClick={send}>
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}