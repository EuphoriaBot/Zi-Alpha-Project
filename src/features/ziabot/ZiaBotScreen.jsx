import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Send, Paperclip } from "lucide-react"
import ChatMessage from "../../shared/components/ChatMessage"
import { initialMessages } from "../../shared/utils/constants"
import styles from "./ZiaBotScreen.module.css"

export default function ZiaBotScreen() {
  const [topicOpen, setTopicOpen] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [topicInput, setTopicInput] = useState("")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  const bottomRef = useRef(null)

  const subjects = useMemo(
    () => [
      { id: "matematika", name: "Matematika", icon: "📐" },
      { id: "ipa", name: "IPA", icon: "🧪" },
      { id: "ips", name: "IPS", icon: "🌍" },
      { id: "bahasa-indonesia", name: "Bahasa Indonesia", icon: "📖" },
      { id: "bahasa-inggris", name: "Bahasa Inggris", icon: "🇬🇧" },
      { id: "fisika", name: "Fisika", icon: "⚡" },
      { id: "kimia", name: "Kimia", icon: "🧬" },
      { id: "biologi", name: "Biologi", icon: "🌿" }
    ],
    []
  )

  const classes = useMemo(() => ["Kelas 7", "Kelas 8", "Kelas 9"], [])

  const getCurrentTime = () => {
    const now = new Date()
    const hh = now.getHours().toString().padStart(2, "0")
    const mm = now.getMinutes().toString().padStart(2, "0")
    return `${hh}:${mm}`
  }

  const makeId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID()
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
  }

  const pushMessage = (partial) => {
    const msg = { id: makeId(), time: getCurrentTime(), ...partial }
    setMessages((prev) => [...prev, msg])
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isTyping])

  const applyContext = () => {
    const cleanTopic = topicInput.trim()
    if (!selectedSubject && !selectedClass && !cleanTopic) return

    const parts = []
    if (selectedSubject) parts.push(subjects.find((s) => s.id === selectedSubject)?.name)
    if (selectedClass) parts.push(selectedClass)
    if (cleanTopic) parts.push(`"${cleanTopic}"`)

    pushMessage({
      type: "bot",
      text: `✓ Konteks diterapkan: ${parts.filter(Boolean).join(", ")}`
    })

    setTopicOpen(false)
  }

  const send = () => {
    const text = input.trim()
    if (!text) return

    pushMessage({ type: "user", text })
    setInput("")

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      pushMessage({
        type: "bot",
        text: "Terima kasih atas pertanyaannya! Saya sedang memproses jawaban terbaik untuk Anda..."
      })
    }, 900)
  }

  return (
    <div className={styles.ziabotScreen}>
      <div className={styles.chatHeaderInfo}>
        <div className={styles.aiAvatar}>🤖</div>
        <div className={styles.aiInfo}>
          <h3>ZiAbot</h3>
          <span className={styles.aiStatus}>AI Study Assistant</span>
        </div>
      </div>

      <div className={styles.ziabotDescription}>
        <p>
          ZiAbot membantu kamu belajar step by step. Jawaban bukan untuk langsung dikasih,
          tapi untuk dipahami.
        </p>
      </div>

      <div className={styles.topicSelectionContainer}>
        <button
          type="button"
          className={styles.topicHeader}
          onClick={() => setTopicOpen((v) => !v)}
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
            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>MATA PELAJARAN</h5>
              <div className={styles.subjectsGrid}>
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    type="button"
                    className={`${styles.subjectBtn} ${
                      selectedSubject === subject.id ? styles.active : ""
                    }`}
                    onClick={() =>
                      setSelectedSubject((prev) => (prev === subject.id ? null : subject.id))
                    }
                  >
                    <span className={styles.subjectIcon}>{subject.icon}</span>
                    <span className={styles.subjectName}>{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.topicSection}>
              <h5 className={styles.sectionTitle}>KELAS</h5>
              <div className={styles.classGrid}>
                {classes.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    className={`${styles.classBtn} ${
                      selectedClass === cls ? styles.active : ""
                    }`}
                    onClick={() => setSelectedClass((prev) => (prev === cls ? null : cls))}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

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

            <button type="button" className={styles.applyContextBtn} onClick={applyContext}>
              ✓ Terapkan Konteks
            </button>
          </div>
        )}
      </div>

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

        <div ref={bottomRef} />
      </div>

      <div className={styles.chatInputContainer}>
        <button type="button" className={styles.attachBtn} aria-label="Lampirkan">
          <Paperclip size={20} />
        </button>

        <input
          className={styles.chatInput}
          placeholder="Tanya ZiA sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              send()
            }
          }}
        />

        <button type="button" className={styles.sendBtn} onClick={send} aria-label="Kirim">
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}
