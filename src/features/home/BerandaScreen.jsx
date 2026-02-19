import { useEffect, useMemo, useRef, useState } from "react"
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react"

export default function BerandaScreen() {
  const videos = useMemo(
    () => [
      {
        id: 1,
        title: "useState vs useRef: Jangan Ketuker!",
        author: "@Zi-Alpha",
        level: "Beginner",
        duration: "3:10",
        likes: 124,
        comments: 12,
        saves: 8,
      },
      {
        id: 2,
        title: "Kenapa React Butuh Key?",
        author: "@Zi-Alpha",
        level: "Intermediate",
        duration: "4:22",
        likes: 98,
        comments: 7,
        saves: 5,
      },
      {
        id: 3,
        title: "Cara Kerja Virtual DOM",
        author: "@Zi-Alpha",
        level: "Advanced",
        duration: "5:01",
        likes: 201,
        comments: 32,
        saves: 19,
      },
    ],
    []
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const containerRef = useRef(null)

  // anti loncat
  const lockRef = useRef(false)
  const wheelAccumRef = useRef(0)

  // swipe state
  const touchStartYRef = useRef(null)
  const touchDeltaYRef = useRef(0)

  const clampIndex = (idx) => Math.max(0, Math.min(videos.length - 1, idx))

  const goTo = (idx) => setCurrentIndex(() => clampIndex(idx))
  const goNext = () => setCurrentIndex((prev) => clampIndex(prev + 1))
  const goPrev = () => setCurrentIndex((prev) => clampIndex(prev - 1))

  const withLock = (fn) => {
    if (lockRef.current) return
    lockRef.current = true
    fn()
    window.setTimeout(() => {
      lockRef.current = false
    }, 380) // feel snap
  }

  // Wheel only inside feed + prevent page scroll
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e) => {
      e.preventDefault()

      wheelAccumRef.current += e.deltaY

      const THRESHOLD = 60
      if (Math.abs(wheelAccumRef.current) < THRESHOLD) return

      const down = wheelAccumRef.current > 0
      wheelAccumRef.current = 0

      withLock(() => {
        if (down) goNext()
        else goPrev()
      })
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [videos.length])

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") withLock(goNext)
      if (e.key === "ArrowUp") withLock(goPrev)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [videos.length])

  // Touch swipe
  const onTouchStart = (e) => {
    if (!e.touches?.length) return
    touchStartYRef.current = e.touches[0].clientY
    touchDeltaYRef.current = 0
  }

  const onTouchMove = (e) => {
    if (touchStartYRef.current == null) return
    const y = e.touches[0].clientY
    touchDeltaYRef.current = y - touchStartYRef.current

    // prevent “pull to refresh / bounce”
    e.preventDefault()
  }

  const onTouchEnd = () => {
    const delta = touchDeltaYRef.current
    touchStartYRef.current = null
    touchDeltaYRef.current = 0

    const SWIPE_THRESHOLD = 55
    if (Math.abs(delta) < SWIPE_THRESHOLD) return

    // swipe up => next (delta negatif)
    withLock(() => {
      if (delta < 0) goNext()
      else goPrev()
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        // penting untuk mobile: biar gesture kita gak bentrok sama scroll browser
        touchAction: "none",
      }}
    >
      {/* SLIDES WRAPPER (ini yang bikin TikTok-feel) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {videos.map((video) => (
          <div key={video.id} className="relative h-full w-full">
            {/* "Video" background (dummy) */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-700 via-indigo-900 to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* CONTENT per slide */}
            <div className="relative h-full flex flex-col justify-end p-6">
              {/* RIGHT ACTIONS */}
              <div className="absolute right-4 bottom-10 flex flex-col items-center gap-7">
                <div className="flex flex-col items-center">
                  <Heart size={28} className="cursor-pointer hover:scale-110 transition" />
                  <span className="text-xs mt-1">{video.likes}</span>
                </div>

                <div className="flex flex-col items-center">
                  <MessageCircle size={28} className="cursor-pointer hover:scale-110 transition" />
                  <span className="text-xs mt-1">{video.comments}</span>
                </div>

                <div className="flex flex-col items-center">
                  <Bookmark size={28} className="cursor-pointer hover:scale-110 transition" />
                  <span className="text-xs mt-1">{video.saves}</span>
                </div>

                <div className="flex flex-col items-center">
                  <Share size={28} className="cursor-pointer hover:scale-110 transition" />
                </div>
              </div>

              {/* VIDEO INFO */}
              <div className="max-w-[80%]">
                <div className="text-sm opacity-70">{video.author}</div>

                <div className="text-xl font-bold mt-1">{video.title}</div>

                <div className="text-sm opacity-60 mt-1">
                  {video.level} • {video.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
