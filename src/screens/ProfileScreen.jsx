import { User } from 'lucide-react'
import styles from './ProfileScreen.module.css'

function ProfileScreen() {
  return (
    <div className={styles.placeholderScreen}>
      <User size={64} color="#ccc" />
      <h2>Profile</h2>
      <p>Halaman profil akan segera hadir</p>
    </div>
  )
}

export default ProfileScreen