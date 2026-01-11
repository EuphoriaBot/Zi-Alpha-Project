import { Search } from 'lucide-react'
import styles from './SearchScreen.module.css'

function SearchScreen() {
  return (
    <div className={styles.placeholderScreen}>
      <Search size={64} color="#ccc" />
      <h2>Search</h2>
      <p>Fitur pencarian akan segera hadir</p>
    </div>
  )
}

export default SearchScreen