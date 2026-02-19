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
  const currentVideo = videos[currentIndex]

  const containerRef = useRef(null)
  const scrollLockRef = useRef(false)
  const wheelAccumRef = useRef(0)

  const goNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : prev))
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e) => {
      e.preventDefault()

      if (scrollLockRef.current) return

      wheelAccumRef.current += e.deltaY

      const THRESHOLD = 60
      if (Math.abs(wheelAccumRef.current) < THRESHOLD) return

      const dirDown = wheelAccumRef.current > 0
      wheelAccumRef.current = 0

      scrollLockRef.current = true
      if (dirDown) goNext()
      else goPrev()

      window.setTimeout(() => {
        scrollLockRef.current = false
      }, 350)
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [videos.length])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowDown") goNext()
      if (e.key === "ArrowUp") goPrev()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [videos.length])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none touch-none"
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-700 via-indigo-900 to-black transition-all duration-500" />

      {/* overlay biar text kebaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* CONTENT */}
      <div className="relative h-full flex flex-col justify-end p-6">
        {/* RIGHT SIDE BUTTONS */}
        <div className="absolute right-4 bottom-10 flex flex-col items-center gap-7">
          <div className="flex flex-col items-center">
            <Heart
              size={28}
              className="cursor-pointer hover:scale-110 transition"
            />
            <span className="text-xs mt-1">{currentVideo.likes}</span>
          </div>

          <div className="flex flex-col items-center">
            <MessageCircle
              size={28}
              className="cursor-pointer hover:scale-110 transition"
            />
            <span className="text-xs mt-1">{currentVideo.comments}</span>
          </div>

          <div className="flex flex-col items-center">
            <Bookmark
              size={28}
              className="cursor-pointer hover:scale-110 transition"
            />
            <span className="text-xs mt-1">{currentVideo.saves}</span>
          </div>

          <div className="flex flex-col items-center">
            <Share
              size={28}
              className="cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>

        {/* VIDEO INFO */}
        <div className="max-w-[80%]">
          <div className="text-sm opacity-70">{currentVideo.author}</div>

          <div className="text-xl font-bold mt-1">{currentVideo.title}</div>

          <div className="text-sm opacity-60 mt-1">
            {currentVideo.level} • {currentVideo.duration}
          </div>
        </div>
      </div>
    </div>
  )
}
