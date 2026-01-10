import { User } from 'lucide-react'

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Zi-Alpha</h1>
      <div className="profile-icon">
        <User size={20} color="#fff" />
      </div>
    </header>
  )
}

export default Header