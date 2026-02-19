import { HelpCircle } from "lucide-react"

export function BossAvatar() {
  return (
    <div className="w-32 h-32 mx-auto mb-2 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl border-4 border-white/20">
      <HelpCircle size={64} className="text-white" />
    </div>
  )
}

export default BossAvatar
