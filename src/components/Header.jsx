import { User } from 'lucide-react'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Zi-Alpha</h1>
      <div className={styles.profileIcon}>
        <User size={20} color="#fff" />
      </div>
    </header>
  )
}

export default Header