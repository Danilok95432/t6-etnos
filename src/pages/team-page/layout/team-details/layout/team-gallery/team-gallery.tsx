import { useState } from "react"
import styles from './index.module.scss'
import { FilterPanel } from "./components/filterPanel/filterPanel"

export const TeamGallery = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('0')
  const [searchRank, setSearchRank] = useState<string>('0')

  const options = {
    name: searchName,
    setSearchName: setSearchName,
    rank: searchRank,
    setSearchRank: setSearchRank,
    type: searchType,
    setSearchType: setSearchType,
  }

  return(
    <div className={styles.gallerySection}>
      <h4>Галерея</h4>
      <div className={styles.headGallery}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего по выбранным фильтрам: 15</p>
    </div>
  )
}