import { useEffect, useMemo, useRef, useState } from "react"
import { Heart, MessageCircle, Bookmark, Share, Volume2, VolumeX, Play } from "lucide-react"
import { contentData } from "../../shared/data/contentData"

export default function BerandaScreen() {
  const videos = useMemo(() => {
    // mapping contentData ke format feed
    return contentData.map((v, idx) => ({
      id: v.id ?? idx,
      title: v.title,
      author: v.author ?? "@Zi-Alpha",
      level: v.level ?? "Beginner",
      duration: v.duration ?? "0:00",
      likes: v.stats?.likes ?? 0,
      comments: v.stats?.comments ?? 0,
      saves: v.stats?.saves ?? 0,
      shares: v.stats?.shares ?? 0,
      videoUrl: v.videoUrl,
      thumbnail: v.thumbnail,
    }))
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [muted, setMuted] = useState(true)

  const containerRef = useRef(null)
  const lockRef = useRef(false)
  const wheelAccumRef = useRef(0)

  // simpan refs semua video
  const videoRefs = useRef([])

  const clampIndex = (idx) => Math.max(0, Math.min(videos.length - 1, idx))
  const goNext = () => setCurrentIndex((prev) => clampIndex(prev + 1))
  const goPrev = () => setCurrentIndex((prev) => clampIndex(prev - 1))

  const withLock = (fn) => {
    if (lockRef.current) return
    lockRef.current = true
    fn()
    window.setTimeout(() => {
      lockRef.current = false
    }, 380)
  }

  // WHEEL: hanya di container
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

  // KEYBOARD
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") withLock(goNext)
      if (e.key === "ArrowUp") withLock(goPrev)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [videos.length])

  // TOUCH SWIPE
  const touchStartYRef = useRef(null)
  const touchDeltaYRef = useRef(0)

  const onTouchStart = (e) => {
    if (!e.touches?.length) return
    touchStartYRef.current = e.touches[0].clientY
    touchDeltaYRef.current = 0
  }

  const onTouchMove = (e) => {
    if (touchStartYRef.current == null) return
    const y = e.touches[0].clientY
    touchDeltaYRef.current = y - touchStartYRef.current
    e.preventDefault()
  }

  const onTouchEnd = () => {
    const delta = touchDeltaYRef.current
    touchStartYRef.current = null
    touchDeltaYRef.current = 0

    const SWIPE_THRESHOLD = 55
    if (Math.abs(delta) < SWIPE_THRESHOLD) return

    withLock(() => {
      if (delta < 0) goNext()
      else goPrev()
    })
  }

  // AUTO PLAY/PAUSE: hanya video aktif
  useEffect(() => {
    videoRefs.current.forEach((vidEl, idx) => {
      if (!vidEl) return

      if (idx === currentIndex) {
        vidEl.muted = muted
        const p = vidEl.play()
        // play() kadang reject kalau user belum interaksi; kita ignore
        if (p && typeof p.catch === "function") p.catch(() => {})
      } else {
        vidEl.pause()
        vidEl.currentTime = 0
      }
    })
  }, [currentIndex, muted])

  const togglePlay = (idx) => {
    const vidEl = videoRefs.current[idx]
    if (!vidEl) return
    if (vidEl.paused) {
      const p = vidEl.play()
      if (p && typeof p.catch === "function") p.catch(() => {})
    } else {
      vidEl.pause()
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "none" }}
    >
      {/* SLIDES WRAPPER */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {videos.map((video, idx) => (
          <div key={video.id} className="relative h-full w-full bg-black">
            {/* VIDEO */}
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={video.videoUrl || undefined}
              poster={video.thumbnail || undefined}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              loop
              muted={muted}
              preload={idx === currentIndex ? "auto" : "metadata"}
              onClick={() => togglePlay(idx)}
            />

            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Top-right mute button */}
            <button
              className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur px-3 py-2 rounded-full text-white flex items-center gap-2"
              onClick={() => setMuted((m) => !m)}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span className="text-xs">{muted ? "Mute" : "Sound"}</span>
            </button>

            {/* Hint play icon (optional, only show if current video paused) */}
            {idx === currentIndex && (
              <PlayHint videoEl={videoRefs.current[idx]} />
            )}

            {/* CONTENT */}
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

              {/* INFO */}
              <div className="max-w-[80%] text-white">
                <div className="text-sm opacity-80">{video.author}</div>
                <div className="text-xl font-bold mt-1">{video.title}</div>
                <div className="text-sm opacity-70 mt-1">
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

function PlayHint({ videoEl }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!videoEl) return

    const sync = () => setShow(videoEl.paused)
    sync()

    videoEl.addEventListener("play", sync)
    videoEl.addEventListener("pause", sync)

    return () => {
      videoEl.removeEventListener("play", sync)
      videoEl.removeEventListener("pause", sync)
    }
  }, [videoEl])

  if (!show) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-black/35 backdrop-blur p-4 rounded-full">
        <Play size={40} className="text-white" />
      </div>
    </div>
  )
}
