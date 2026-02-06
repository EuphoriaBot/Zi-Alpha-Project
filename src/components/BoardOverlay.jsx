export default function BoardOverlay() {
  return (
    <svg viewBox="0 0 100 100" className="overlay">
      {/* TANGGA */}
      <line x1="10" y1="80" x2="40" y2="30" stroke="#22c55e" strokeWidth="2"/>
      <line x1="14" y1="80" x2="44" y2="30" stroke="#22c55e" strokeWidth="2"/>

      {/* ULAR */}
      <path
        d="M70 20 C60 30, 80 40, 65 55 C50 70, 75 85, 60 90"
        stroke="#ef4444"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
