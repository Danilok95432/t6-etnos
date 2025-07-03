import { useState, type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import styles from './index.module.scss'
import { ParticipantCard } from 'src/components/participant-card/participant-card'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { ParticipantItem } from 'src/types/participants'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEventParticipantsByIdQuery } from 'src/store/events/events.api'
import { FilterPanel } from './components/filterPanel/filterPanel'
import { HeroCard } from 'src/components/hero-card/hero-card'

export const HeroHeroes: FC = () => {
  const { id } = useParams()
  const { data: eventDataParticipants } = useGetEventParticipantsByIdQuery(id ?? '')

  const breakpoint = useBreakPoint()
  const navigate = useNavigate()

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

  const rowClickHandler = (id: string) => {
		navigate(`/participants/${id}`)
	}

  return (
    <div className={styles.participantsSection}>
      <h4>Герои</h4>
      <div className={styles.headHeroes}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего участников по выбранным фильтрам: 15</p>
      <MobileList
        items={[]}
        renderItem={HeroCard}
        classListItems={styles.participantsTab}
        defaultVisibleCount={3}
        classNameBtn={styles.showMoreBtnTab}
      />
    </div>
  )
}

