import { useState } from 'react'
import { FilterPanel } from './components/filterPanel/filterPanel'
import styles from './index.module.scss'
import { SingleRequstsTable } from './components/single-requests-table/single-requests-table'
import { GroupRequstsTable } from './components/group-requests-table/group-requests-table'

export const EventProgramDetails = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [searchRegion, setSearchRegion] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('0')
  const [view, setView] = useState<string>('list')

  const isSingle = true

  const options = {
    name: searchName,
    setSearchName: setSearchName,
    region: searchRegion,
    setSearchRegion: setSearchRegion,
    type: searchType,
    setSearchType: setSearchType,
    view: view,
    setView: setView,
  }
  return (
    <div className={styles.teamsSection}>
      <h4>Все заявки</h4>
      <div className={styles.headTeams}>
        <FilterPanel options={options} isSingle={isSingle} />
      </div>
      <p className={styles.numberOfFilter}>{isSingle ? 'Всего участников по выбранным фильтрам: 15' : 'Всего групп по выбранным фильтрам: 15'}</p>
      {
        isSingle ?
        <SingleRequstsTable view={view} />
        :
        <GroupRequstsTable view={view} />
      }
    </div>
  )
}
