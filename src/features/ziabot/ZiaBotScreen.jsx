import { useRef, useState } from "react"
import { Brain, FileUp, Paperclip, Send } from "lucide-react"
import styles from "./ZiaBotScreen.module.css"

export default function ZiaBotScreen() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const fileInputRef = useRef(null)
  const nextIdRef = useRef(1)

  const getTime = () => {
    const d = new Date()
    const hh = String(d.getHours()).padStart(2, "0")
    const mm = String(d.getMinutes()).padStart(2, "0")
    return `${hh}:${mm}`
  }

  const pushMessage = (type, text) => {
    const id = nextIdRef.current++
    setMessages((prev) => [...prev, { id, type, text, time: getTime() }])
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    pushMessage("user", trimmed)
    setInput("")

    setTimeout(() => {
      pushMessage(
        "bot",
        `Oke, aku tangkap.\n\n(Ini masih dummy) Nanti ZiAbot bakal jawab step-by-step ya ✅`
      )
    }, 600)
  }

  const openFilePicker = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    pushMessage("bot", `📄 Dokumen diterima: "${file.name}"\n(Mode dummy — belum diproses AI)`)
    e.target.value = ""
  }

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.topHeader}>
      <div className={styles.topLeft}>
        <div className={styles.topIcon}>
          <Brain size={20} />
        </div>
        <div className={styles.topText}>
          <div className={styles.titleRow}>
            <div className={styles.topTitle}>ZiAbot</div>
            <span className={styles.badge}>AI Study Assistant</span>
          </div>
        </div>
      </div>
    </div>

      {/* Content */}
      <div className={styles.content}>
        {messages.length === 0 ? (
          <div className={styles.emptyWrap}>
            <div className={styles.heroIcon}>
              <Brain size={34} />
            </div>

            <h2 className={styles.heroTitle}>Meet ZiAbot</h2>

            <p className={styles.heroDesc}>
              Your AI-powered study mentor. Ask questions, explore concepts,
              or upload documents to learn smarter.
            </p>

            <button className={styles.uploadCard} onClick={openFilePicker} type="button">
              <div className={styles.uploadLeft}>
                <div className={styles.uploadIcon}>
                  <FileUp size={18} />
                </div>
                <div className={styles.uploadText}>
                  <div className={styles.uploadTitle}>Upload Document</div>
                  <div className={styles.uploadSub}>
                    PDF, Image, or Doc • Learn with AI
                  </div>
                </div>
              </div>

              <div className={styles.uploadChevron}>›</div>
            </button>

            <div className={styles.tipBox}>
              ZiAbot membantu kamu belajar step by step. Jawaban bukan untuk langsung
              dikasih, tapi untuk dipahami.
            </div>
          </div>
        ) : (
          <div className={styles.chatWrap}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.msgRow} ${m.type === "user" ? styles.userRow : styles.botRow}`}
              >
                <div className={styles.msgBubble}>
                  <div className={styles.msgText}>{m.text}</div>
                  <div className={styles.msgTime}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className={styles.inputBar}>
        <button className={styles.iconBtn} onClick={openFilePicker} type="button" title="Upload">
          <Paperclip size={18} />
        </button>

        <input
          className={styles.input}
          placeholder="Message ZiAbot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button className={styles.sendBtn} onClick={handleSend} type="button" title="Send">
          <Send size={18} />
        </button>

        <input
          ref={fileInputRef}
          className={styles.hiddenFile}
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
