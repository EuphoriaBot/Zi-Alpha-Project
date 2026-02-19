export const contentData = [
    {
        id: "vid-001",
        title: "Kenapa React Pakai Virtual DOM?",
        author: "@Zi-Alpha",
        topic: "React",
        level: "Beginner",
        duration: "2:45",

        // SAMPLE VIDEO (ganti nanti)
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        thumbnail: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=900&fit=crop",

        learningGoal: "Memahami alasan React menggunakan Virtual DOM",
        keyPoints: [
            "DOM itu mahal untuk di-render",
            "Virtual DOM bekerja dengan diffing",
            "Update jadi lebih efisien",
        ],

        aiContext: {
            summary:
                "Video ini menjelaskan konsep Virtual DOM dan kenapa React tidak langsung memanipulasi DOM asli.",
            prompt:
                "Coba jelaskan ulang dengan bahasamu sendiri kenapa React butuh Virtual DOM.",
            followUpQuestions: [
                "Apa yang terjadi jika DOM di-update terlalu sering?",
                "Kenapa React tidak langsung update DOM asli?",
            ],
        },

        discussion: {
            triggerQuestion:
                "Menurut kamu, apakah Virtual DOM masih relevan di tahun sekarang?",
            tags: ["react", "frontend", "web"],
        },

        stats: {
            likes: 1200,
            comments: 234,
            saves: 87,
            shares: 54,
        },
    },

    {
        id: "vid-002",
        title: "useState vs useRef: Jangan Ketuker!",
        author: "@Zi-Alpha",
        topic: "React Hooks",
        level: "Beginner",
        duration: "3:10",

        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&fit=crop",

        learningGoal: "Memahami perbedaan useState dan useRef dan kapan menggunakannya",
        keyPoints: [
            "useState trigger re-render",
            "useRef tidak trigger re-render",
            "useRef cocok untuk mutable value",
        ],

        aiContext: {
            summary:
                "Video ini membahas perbedaan fundamental antara useState dan useRef.",
            prompt:
                "Sebutkan satu contoh kasus di mana useRef lebih tepat daripada useState.",
            followUpQuestions: [
                "Apa dampak re-render terhadap performa?",
                "Kenapa useRef tidak menyebabkan re-render?",
            ],
        },

        discussion: {
            triggerQuestion:
                "Pernah salah pakai useState padahal seharusnya useRef?",
            tags: ["react", "hooks"],
        },

        stats: {
            likes: 980,
            comments: 143,
            saves: 102,
            shares: 31,
        },
    },
]
