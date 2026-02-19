import { useState, useEffect } from "react"

export function useBattleEngine(initialBoss, initialPlayer) {
    const [bossShieldHP, setBossShieldHP] = useState(initialBoss.shield)
    const [bossCoreHP, setBossCoreHP] = useState(initialBoss.core)
    const [playerHP, setPlayerHP] = useState(initialPlayer.hp)
    const [combo, setCombo] = useState(0)
    const [battleLog, setBattleLog] = useState([])
    const [status, setStatus] = useState("active")

    const calculatePlayerDamage = () => 20 + combo * 5
    const calculateBossDamage = () => 15

    const pushLog = (text) => {
        setBattleLog((prev) => [...prev, text].slice(-30)) // simpan max 30 log terakhir
    }

    const handleAnswer = (isCorrect) => {
        if (status !== "active") return

        if (isCorrect) {
            const damage = calculatePlayerDamage()

            // damage: shield dulu, kalau shield jebol, sisa masuk core
            if (bossShieldHP > 0) {
                const shieldAfter = bossShieldHP - damage

                if (shieldAfter > 0) {
                    setBossShieldHP(shieldAfter)
                } else {
                    setBossShieldHP(0)
                    const overflow = Math.abs(shieldAfter)
                    setBossCoreHP((prev) => Math.max(prev - overflow, 0))
                }
            } else {
                setBossCoreHP((prev) => Math.max(prev - damage, 0))
            }

            setCombo((prev) => prev + 1)
            pushLog(`🔥 Player dealt ${damage} damage`)
        } else {
            const damage = calculateBossDamage()

            setPlayerHP((prev) => Math.max(prev - damage, 0))
            setCombo(0)
            pushLog(`💥 Boss dealt ${damage} damage`)
        }
    }

    useEffect(() => {
        if (bossCoreHP <= 0 && status === "active") {
            setStatus("victory")
            pushLog("🏆 Boss defeated!")
        }
    }, [bossCoreHP, status])

    useEffect(() => {
        if (playerHP <= 0 && status === "active") {
            setStatus("defeat")
            pushLog("💀 Player defeated!")
        }
    }, [playerHP, status])

    return {
        bossShieldHP,
        bossCoreHP,
        playerHP,
        combo,
        battleLog,
        status,
        handleAnswer
    }
}
