import { useState } from 'react'
import { FilterPanel } from './components/filterPanel/filterPanel'
import styles from './index.module.scss'
import { SingleRequstsTable } from './components/single-requests-table/single-requests-table'
import { GroupRequstsTable } from './components/group-requests-table/group-requests-table'
import { useParams } from 'react-router-dom'
import { useGetSubEventProgramByIdQuery } from 'src/store/events/events.api'

export const EventProgramDetails = () => {
  const { subId = '' } = useParams()
  const { data: subEventData } = useGetSubEventProgramByIdQuery(subId)
  const [searchName, setSearchName] = useState<string>('')
  const [searchRegion, setSearchRegion] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('0')
  const [view, setView] = useState<string>('list')

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
        <FilterPanel options={options} isSingle={subEventData?.is_group} />
      </div>
      <p className={styles.numberOfFilter}>{subEventData?.is_group ? 'Всего групп по выбранным фильтрам: 15' : 'Всего участников по выбранным фильтрам: 15'}</p>
      {
        subEventData?.is_group ?
        <GroupRequstsTable view={view} />
        :
        <SingleRequstsTable view={view} />
      }
    </div>
  )
}
