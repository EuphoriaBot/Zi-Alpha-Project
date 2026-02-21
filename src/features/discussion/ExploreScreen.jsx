import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import styles from "./ExploreScreen.module.css"

export default function ExploreScreen() {
  const subjects = useMemo(
    () => [
      {
        id: "matematika",
        title: "Matematika",
        icon: "📐",
        progress: 72,
        lessons: [
          { name: "Pecahan", count: 10 },
          { name: "Bilangan Bulat", count: 8 },
          { name: "Himpunan", count: 5 },
        ],
      },
      {
        id: "ipa",
        title: "IPA",
        icon: "🧪",
        progress: 58,
        lessons: [
          { name: "Klasifikasi Makhluk Hidup", count: 12 },
          { name: "Zat dan Karakteristiknya", count: 7 },
        ],
      },
      {
        id: "ips",
        title: "IPS",
        icon: "🌍",
        progress: 45,
        lessons: [{ name: "Interaksi Sosial", count: 6 }],
      },
      {
        id: "bahasa-inggris",
        title: "Bahasa Inggris",
        icon: "🇬🇧",
        progress: 33,
        lessons: [{ name: "Present Perfect", count: 9 }],
      },
      {
        id: "bahasa-indonesia",
        title: "Bahasa Indonesia",
        icon: "📝",
        progress: 25,
        lessons: [{ name: "Teks Eksplanasi", count: 4 }],
      },
      {
        id: "fisika",
        title: "Fisika",
        icon: "⚡",
        progress: 14,
        lessons: [{ name: "Gerak & Gaya", count: 6 }],
      },
      {
        id: "kimia",
        title: "Kimia",
        icon: "🧬",
        progress: 9,
        lessons: [{ name: "Asam Basa", count: 5 }],
      },
      {
        id: "biologi",
        title: "Biologi",
        icon: "🌿",
        progress: 18,
        lessons: [{ name: "Sel & Jaringan", count: 7 }],
      },
    ],
    []
  )

  const [query, setQuery] = useState("")
  const [activeClass, setActiveClass] = useState("Kelas 7")

  const classChips = ["Kelas 7", "Kelas 8", "Kelas 9"]

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return subjects

    return subjects.filter((s) => {
      const inTitle = s.title.toLowerCase().includes(q)
      const inLessons = s.lessons.some((l) => l.name.toLowerCase().includes(q))
      return inTitle || inLessons
    })
  }, [subjects, query])

  return (
    <div className={styles.screen}>
      {/* TOP */}
      <div className={styles.topArea}>
        <h1 className={styles.title}>Explore</h1>

        {/* Search */}
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Cari mata pelajaran, topik, atau playlist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Class chips */}
        <div className={styles.chipsRow}>
          {classChips.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.chip} ${activeClass === c ? styles.chipActive : ""}`}
              onClick={() => setActiveClass(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>MATA PELAJARAN</div>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {filteredSubjects.map((s) => (
          <SubjectCard key={s.id} data={s} activeClass={activeClass} />
        ))}
      </div>
    </div>
  )
}

function SubjectCard({ data, activeClass }) {
  return (
    <div className={styles.card}>
      {/* header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <div className={styles.cardIcon}>{data.icon}</div>
          <div className={styles.cardTitle}>{data.title}</div>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>Progress</div>
          <div className={styles.progressValue}>{data.progress}%</div>
        </div>
      </div>

      {/* progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${data.progress}%` }} />
      </div>

      {/* lessons */}
      <div className={styles.lessonList}>
        {data.lessons.slice(0, 2).map((l) => (
          <div key={l.name} className={styles.lessonRow}>
            <div className={styles.lessonName}>{l.name}</div>
            <div className={styles.lessonCount}>◦ {l.count}</div>
          </div>
        ))}

        {data.lessons.length === 0 && (
          <div className={styles.lessonEmpty}>Belum ada materi</div>
        )}
      </div>

      {/* actions */}
      <div className={styles.cardActions}>
        <button
          type="button"
          className={styles.ziaBtn}
          onClick={() => alert(`(dummy) Buka ZiAbot: ${data.title} • ${activeClass}`)}
        >
          🤖 ZiAbot
        </button>

        <button
          type="button"
          className={styles.arrowBtn}
          onClick={() => alert(`(dummy) Buka detail: ${data.title} • ${activeClass}`)}
          aria-label="Open"
        >
          ›
        </button>
      </div>
    </div>
  )
}