export const contentData = [
    {
        id: "vid-001",

        // === CORE CONTENT ===
        title: "Kenapa React Pakai Virtual DOM?",
        author: "Zi-Alpha",
        topic: "React",
        level: "Beginner",
        duration: "2:45",

        // === MEDIA ===
        videoUrl: null, // nanti isi mp4 / HLS
        thumbnail: null,

        // === LEARNING DESIGN ===
        learningGoal: "Memahami alasan React menggunakan Virtual DOM",
        keyPoints: [
            "DOM itu mahal untuk di-render",
            "Virtual DOM bekerja dengan diffing",
            "Update jadi lebih efisien"
        ],

        // === AI INTEGRATION (ZiAbot) ===
        aiContext: {
            summary:
                "Video ini menjelaskan konsep Virtual DOM dan kenapa React tidak langsung memanipulasi DOM asli.",
            prompt:
                "Coba jelaskan ulang dengan bahasamu sendiri kenapa React butuh Virtual DOM.",
            followUpQuestions: [
                "Apa yang terjadi jika DOM di-update terlalu sering?",
                "Kenapa React tidak langsung update DOM asli?"
            ]
        },

        // === DISCUSSION & INTERACTION ===
        discussion: {
            triggerQuestion:
                "Menurut kamu, apakah Virtual DOM masih relevan di tahun sekarang?",
            tags: ["react", "frontend", "web"]
        },

        // === USER INTERACTION STATS (dummy dulu) ===
        stats: {
            likes: 1200,
            comments: 234,
            saves: 87,
            shares: 54
        }
    },

    {
        id: "vid-002",
        title: "useState vs useRef: Jangan Ketuker!",
        author: "Zi-Alpha",
        topic: "React Hooks",
        level: "Beginner",
        duration: "3:10",
        videoUrl: null,
        thumbnail: null,

        learningGoal:
            "Memahami perbedaan useState dan useRef dan kapan menggunakannya",

        keyPoints: [
            "useState trigger re-render",
            "useRef tidak trigger re-render",
            "useRef cocok untuk mutable value"
        ],

        aiContext: {
            summary:
                "Video ini membahas perbedaan fundamental antara useState dan useRef.",
            prompt:
                "Sebutkan satu contoh kasus di mana useRef lebih tepat daripada useState.",
            followUpQuestions: [
                "Apa dampak re-render terhadap performa?",
                "Kenapa useRef tidak menyebabkan re-render?"
            ]
        },

        discussion: {
            triggerQuestion:
                "Pernah salah pakai useState padahal seharusnya useRef?",
            tags: ["react", "hooks"]
        },

        stats: {
            likes: 980,
            comments: 143,
            saves: 102,
            shares: 31
        }
    }
]