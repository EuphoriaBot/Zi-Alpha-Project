import { useEffect, useMemo, useRef, useState } from "react"
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  Volume2,
  VolumeX,
  Play,
  X,
  Send,
} from "lucide-react"
import { contentData } from "../../shared/data/contentData"

export default function BerandaScreen() {
  const videos = useMemo(() => {
    return contentData.map((v, idx) => ({
      id: v.id ?? idx,
      title: v.title,
      author: v.author ?? "@Zi-Alpha",
      level: v.level ?? "Beginner",
      durationLabel: v.duration ?? "0:00",
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

  // progress video aktif (0..1)
  const [progress, setProgress] = useState(0)

  // like state lokal
  const [likedMap, setLikedMap] = useState(() => {
    const init = {}
    for (const v of videos) init[v.id] = false
    return init
  })
  const [likeCountMap, setLikeCountMap] = useState(() => {
    const init = {}
    for (const v of videos) init[v.id] = v.likes
    return init
  })

  // heart burst anim per video id
  const [heartBurst, setHeartBurst] = useState({}) // { [id]: { x,y, key } }

  // COMMENT DRAWER
  const [commentOpen, setCommentOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [commentsByVideo, setCommentsByVideo] = useState(() => {
    // dummy awal per video
    const init = {}
    for (const v of videos) {
      init[v.id] = [
        { id: 1, user: "Budi", text: "Wih jelas banget 🔥", time: "1m" },
        { id: 2, user: "Siti", text: "Aku baru paham sekarang!", time: "3m" },
        { id: 3, user: "Rizky", text: "Bisa bahas contoh realnya?", time: "6m" },
      ]
    }
    return init
  })

  const containerRef = useRef(null)
  const lockRef = useRef(false)
  const wheelAccumRef = useRef(0)
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

  // ====== INPUT: WHEEL (khusus feed) ======
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e) => {
      // kalau comment drawer lagi open, jangan geser feed
      if (commentOpen) return

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
  }, [videos.length, commentOpen])

  // ====== INPUT: KEYBOARD ======
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && commentOpen) {
        setCommentOpen(false)
        return
      }
      if (commentOpen) return

      if (e.key === "ArrowDown") withLock(goNext)
      if (e.key === "ArrowUp") withLock(goPrev)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [videos.length, commentOpen])

  // ====== INPUT: TOUCH SWIPE ======
  const touchStartYRef = useRef(null)
  const touchDeltaYRef = useRef(0)

  const onTouchStart = (e) => {
    if (commentOpen) return
    if (!e.touches?.length) return
    touchStartYRef.current = e.touches[0].clientY
    touchDeltaYRef.current = 0
  }

  const onTouchMove = (e) => {
    if (commentOpen) return
    if (touchStartYRef.current == null) return
    const y = e.touches[0].clientY
    touchDeltaYRef.current = y - touchStartYRef.current
    e.preventDefault()
  }

  const onTouchEnd = () => {
    if (commentOpen) return

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

  // ====== PLAY/PAUSE hanya video aktif (dan preload next) ======
  useEffect(() => {
    setProgress(0)

    videoRefs.current.forEach((vidEl, idx) => {
      if (!vidEl) return
      const isActive = idx === currentIndex

      if (isActive && !commentOpen) {
        vidEl.muted = muted
        const p = vidEl.play()
        if (p && typeof p.catch === "function") p.catch(() => {})
      } else {
        vidEl.pause()
        if (!commentOpen) vidEl.currentTime = 0
      }
    })
  }, [currentIndex, muted, commentOpen])

  // ====== PROGRESS BAR untuk video aktif ======
  useEffect(() => {
    let raf = null

    const tick = () => {
      const vidEl = videoRefs.current[currentIndex]
      if (vidEl && vidEl.duration && !Number.isNaN(vidEl.duration)) {
        const p = Math.min(1, Math.max(0, vidEl.currentTime / vidEl.duration))
        setProgress(p)
      } else {
        setProgress(0)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [currentIndex])

  // ====== DOUBLE TAP LIKE (tanpa ganggu single tap play/pause) ======
  const lastTapRef = useRef(0)
  const singleTapTimerRef = useRef(null)

  const likeVideo = (videoId) => {
    setLikedMap((prev) => {
      const next = { ...prev }
      const already = !!next[videoId]
      next[videoId] = true
      if (!already) {
        setLikeCountMap((prevCount) => ({
          ...prevCount,
          [videoId]: (prevCount[videoId] ?? 0) + 1,
        }))
      }
      return next
    })
  }

  const triggerHeartBurst = (videoId, x, y) => {
    const key = `${Date.now()}-${Math.random()}`
    setHeartBurst((prev) => ({
      ...prev,
      [videoId]: { x, y, key },
    }))

    window.setTimeout(() => {
      setHeartBurst((prev) => {
        const copy = { ...prev }
        if (copy[videoId]?.key === key) delete copy[videoId]
        return copy
      })
    }, 650)
  }

  const handleTapOnSlide = (e, idx) => {
    if (commentOpen) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const now = Date.now()
    const DOUBLE_TAP_MS = 260
    const isDouble = now - lastTapRef.current < DOUBLE_TAP_MS
    lastTapRef.current = now

    const video = videos[idx]
    if (!video) return

    if (isDouble) {
      if (singleTapTimerRef.current) {
        clearTimeout(singleTapTimerRef.current)
        singleTapTimerRef.current = null
      }

      likeVideo(video.id)
      triggerHeartBurst(video.id, x, y)
      return
    }

    singleTapTimerRef.current = window.setTimeout(() => {
      singleTapTimerRef.current = null
      const vidEl = videoRefs.current[idx]
      if (!vidEl) return
      if (vidEl.paused) {
        const p = vidEl.play()
        if (p && typeof p.catch === "function") p.catch(() => {})
      } else {
        vidEl.pause()
      }
    }, DOUBLE_TAP_MS + 10)
  }

  // ====== performa: video element hanya untuk idx dekat (prev/current/next) ======
  const shouldMountVideo = (idx) => Math.abs(idx - currentIndex) <= 1

  const getPreloadValue = (idx) => {
    if (idx === currentIndex) return "auto"
    if (idx === currentIndex + 1) return "auto"
    return "metadata"
  }

  const openComments = () => {
    setCommentOpen(true)
    setCommentText("")
  }

  const submitComment = () => {
    const text = commentText.trim()
    if (!text) return

    const videoId = videos[currentIndex]?.id
    if (videoId == null) return

    setCommentsByVideo((prev) => {
      const list = prev[videoId] ?? []
      const newItem = {
        id: Date.now(),
        user: "Kamu",
        text,
        time: "now",
      }
      return {
        ...prev,
        [videoId]: [newItem, ...list],
      }
    })

    setCommentText("")
  }

  const activeVideo = videos[currentIndex]
  const activeVideoId = activeVideo?.id
  const activeComments = activeVideoId != null ? (commentsByVideo[activeVideoId] ?? []) : []

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "none" }}
    >
      {/* Progress bar tipis */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-30">
        <div
          className="h-full bg-white"
          style={{
            width: `${Math.round(progress * 100)}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      {/* SLIDES WRAPPER */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {videos.map((video, idx) => {
          const isActive = idx === currentIndex
          const liked = !!likedMap[video.id]
          const likeCount = likeCountMap[video.id] ?? video.likes

          return (
            <div
              key={video.id}
              className="relative h-full w-full bg-black"
              onClick={(e) => handleTapOnSlide(e, idx)}
            >
              {/* VIDEO (hanya prev/current/next) */}
              {shouldMountVideo(idx) ? (
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={video.videoUrl || undefined}
                  poster={video.thumbnail || undefined}
                  className="absolute inset-0 h-full w-full object-cover"
                  playsInline
                  loop
                  muted={muted}
                  preload={getPreloadValue(idx)}
                />
              ) : (
                <div className="absolute inset-0">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-b from-indigo-700 via-indigo-900 to-black" />
                  )}
                </div>
              )}

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* tombol mute */}
              <button
                className="absolute top-4 right-4 z-30 bg-black/40 backdrop-blur px-3 py-2 rounded-full text-white flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setMuted((m) => !m)
                }}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span className="text-xs">{muted ? "Mute" : "Sound"}</span>
              </button>

              {/* heart burst */}
              {heartBurst[video.id] && isActive && (
                <HeartBurst x={heartBurst[video.id].x} y={heartBurst[video.id].y} />
              )}

              {/* play hint */}
              {isActive && !commentOpen && <PlayHint videoEl={videoRefs.current[idx]} />}

              {/* UI */}
              <div className="relative h-full flex flex-col justify-end p-6">
                {/* right actions */}
                <div
                  className="absolute right-4 bottom-10 flex flex-col items-center gap-7 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        setLikedMap((prev) => {
                          const next = { ...prev }
                          const was = !!next[video.id]
                          next[video.id] = !was
                          setLikeCountMap((prevCount) => ({
                            ...prevCount,
                            [video.id]: (prevCount[video.id] ?? 0) + (was ? -1 : 1),
                          }))
                          return next
                        })
                      }}
                      className="cursor-pointer hover:scale-110 transition"
                    >
                      <Heart size={28} className={liked ? "fill-white" : ""} />
                    </button>
                    <span className="text-xs mt-1">{likeCount}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={openComments}
                      className="cursor-pointer hover:scale-110 transition"
                    >
                      <MessageCircle size={28} />
                    </button>
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

                {/* info */}
                <div className="max-w-[80%] text-white">
                  <div className="text-sm opacity-80">{video.author}</div>
                  <div className="text-xl font-bold mt-1">{video.title}</div>
                  <div className="text-sm opacity-70 mt-1">
                    {video.level} • {video.durationLabel}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* COMMENT DRAWER */}
      <CommentDrawer
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        title={activeVideo?.title ?? "Komentar"}
        comments={activeComments}
        value={commentText}
        onChange={setCommentText}
        onSend={submitComment}
      />
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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="bg-black/35 backdrop-blur p-4 rounded-full">
        <Play size={40} className="text-white" />
      </div>
    </div>
  )
}

function HeartBurst({ x, y }) {
  return (
    <div
      className="absolute z-40 pointer-events-none"
      style={{ left: x - 28, top: y - 28 }}
    >
      <div className="animate-[heartPop_650ms_ease-out_forwards]">
        <Heart size={56} className="text-white fill-white drop-shadow" />
      </div>

      <style>{`
        @keyframes heartPop {
          0%   { transform: scale(0.6); opacity: 0; }
          20%  { transform: scale(1.1); opacity: 1; }
          60%  { transform: scale(1.0); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function CommentDrawer({
  open,
  onClose,
  title,
  comments,
  value,
  onChange,
  onSend,
}) {
  // block body scroll when open (extra safety)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 z-40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* Sheet */}
      <div
        className={`absolute left-0 right-0 bottom-0 z-50 bg-[#0F0F1E] rounded-t-2xl border-t border-white/10
        transition-transform duration-300 ease-out`}
        style={{
          transform: open ? "translateY(0%)" : "translateY(105%)",
          height: "72%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="text-white font-semibold text-sm line-clamp-1">
            Komentar • {title}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comments list */}
        <div className="h-[calc(100%-112px)] overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {comments.length === 0 ? (
            <div className="text-white/60 text-sm text-center mt-10">
              Belum ada komentar. Jadi yang pertama!
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                  {String(c.user || "?").slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-white font-semibold text-sm">{c.user}</div>
                    <div className="text-white/50 text-xs">{c.time}</div>
                  </div>
                  <div className="text-white/90 text-sm leading-relaxed">
                    {c.text}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tulis komentar..."
            className="flex-1 bg-white/10 text-white placeholder:text-white/50 px-4 py-3 rounded-full outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend()
            }}
          />
          <button
            onClick={onSend}
            className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center"
            title="Kirim"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  )
}
