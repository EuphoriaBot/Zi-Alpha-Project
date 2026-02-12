export default function BossHpBar({ shield, core }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <div>
        🛡 Shield
        <div style={barOuter}>
          <div style={{ ...barInner, width: `${shield}%`, background: "#00c2ff" }} />
        </div>
      </div>

      <div>
        ❤️ Core
        <div style={barOuter}>
          <div style={{ ...barInner, width: `${core}%`, background: "#ff4d4d" }} />
        </div>
      </div>
    </div>
  )
}

const barOuter = {
  width: "300px",
  height: "18px",
  background: "#333",
  margin: "5px auto",
  borderRadius: "10px",
  overflow: "hidden"
}

const barInner = {
  height: "100%",
  transition: "0.3s"
}
