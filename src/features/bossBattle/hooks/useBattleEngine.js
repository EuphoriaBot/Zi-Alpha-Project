import { useReducer } from "react"

const MAX_LOGS = 30

function addLog(logs, text) {
    return [...logs, { id: `${Date.now()}-${Math.random()}`, text }].slice(-MAX_LOGS)
}

function reducer(state, action) {
    switch (action.type) {
        case "ANSWER": {
            if (state.status !== "active") return state

            let next = { ...state }

            if (action.correct) {
                const damage = 20 + next.combo * 5

                if (next.bossShieldHP > 0) {
                    const shieldAfter = next.bossShieldHP - damage
                    if (shieldAfter > 0) {
                        next.bossShieldHP = shieldAfter
                    } else {
                        next.bossShieldHP = 0
                        const overflow = Math.abs(shieldAfter)
                        next.bossCoreHP = Math.max(next.bossCoreHP - overflow, 0)
                    }
                } else {
                    next.bossCoreHP = Math.max(next.bossCoreHP - damage, 0)
                }

                next.combo = next.combo + 1
                next.logs = addLog(next.logs, `🔥 Player dealt ${damage} damage`)
            } else {
                const damage = 15
                next.playerHP = Math.max(next.playerHP - damage, 0)
                next.combo = 0
                next.logs = addLog(next.logs, `💥 Boss dealt ${damage} damage`)
            }

            // status check (dan log 1x)
            if (next.bossCoreHP <= 0) {
                next.status = "victory"
                next.logs = addLog(next.logs, "🏆 Boss defeated!")
            } else if (next.playerHP <= 0) {
                next.status = "defeat"
                next.logs = addLog(next.logs, "💀 Player defeated!")
            }

            return next
        }

        default:
            return state
    }
}

export function useBattleEngine(initialBoss, initialPlayer) {
    const [state, dispatch] = useReducer(reducer, {
        bossShieldHP: initialBoss.shield,
        bossCoreHP: initialBoss.core,
        playerHP: initialPlayer.hp,
        combo: 0,
        logs: [],
        status: "active",
    })

    const handleAnswer = (isCorrect) => {
        dispatch({ type: "ANSWER", correct: isCorrect })
    }

    return {
        bossShieldHP: state.bossShieldHP,
        bossCoreHP: state.bossCoreHP,
        playerHP: state.playerHP,
        combo: state.combo,
        battleLog: state.logs.map((l) => l.text),
        status: state.status,
        handleAnswer,
    }
}