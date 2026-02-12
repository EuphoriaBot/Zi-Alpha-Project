import { useState, useEffect } from "react"

export function useBattleEngine(initialBoss, initialPlayer) {

    const [bossShieldHP, setBossShieldHP] = useState(initialBoss.shield)
    const [bossCoreHP, setBossCoreHP] = useState(initialBoss.core)
    const [playerHP, setPlayerHP] = useState(initialPlayer.hp)
    const [combo, setCombo] = useState(0)
    const [battleLog, setBattleLog] = useState([])
    const [status, setStatus] = useState("active")

    const calculatePlayerDamage = () => {
        return 20 + combo * 5
    }

    const calculateBossDamage = () => {
        return 15
    }

    const handleAnswer = (isCorrect) => {

        if (status !== "active") return

        if (isCorrect) {

            const damage = calculatePlayerDamage()

            if (bossShieldHP > 0) {
                setBossShieldHP(prev => Math.max(prev - damage, 0))
            } else {
                setBossCoreHP(prev => Math.max(prev - damage, 0))
            }

            setCombo(prev => prev + 1)

            setBattleLog(prev => [
                `🔥 Player dealt ${damage} damage`,
                ...prev
            ])

        } else {

            const damage = calculateBossDamage()

            setPlayerHP(prev => Math.max(prev - damage, 0))
            setCombo(0)

            setBattleLog(prev => [
                `💥 Boss dealt ${damage} damage`,
                ...prev
            ])
        }
    }

    // FIXED: pakai useEffect
    useEffect(() => {
        if (bossCoreHP <= 0 && status === "active") {
            setStatus("victory")
        }
    }, [bossCoreHP, status])

    useEffect(() => {
        if (playerHP <= 0 && status === "active") {
            setStatus("defeat")
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
