import { HugeiconsIcon } from "@hugeicons/react"
import { HelpCircleIcon } from "@hugeicons/core-free-icons"

export function BossAvatar() {

  return (
    <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl border-4 border-white/20">
      <HugeiconsIcon
        icon={HelpCircleIcon}
        size={64}
        className="text-white"
      />
    </div>
  )
}

export default BossAvatar
