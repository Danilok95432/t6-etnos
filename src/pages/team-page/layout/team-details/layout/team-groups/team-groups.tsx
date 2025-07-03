import { useState, type FC } from 'react'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import styles from './index.module.scss'
import { TeamCard } from 'src/components/team-card/team-card'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { TeamItem } from 'src/types/teams'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'
import { useNavigate } from 'react-router-dom'
import { FilterPanel } from './components/filterPanel/filterPanel'

export const TeamGroups: FC = () => {

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
    navigate(`/teams/${id}`)
  }

  const tableTitles = [
    '№',
    'Название',
    'Регион',
    'Категория',
    'Участники',
    'Подгруппы',
    'Рейтинг',
  ]
  const formatEventsTableData = (teams: TeamItem[]) => {
    return teams.map((teamEl) => {
      return {
        rowId: teamEl.id,
        cells: [
          <p key='0' className={styles.idCell}>{teamEl.id}</p>,
          <img key='1' src={teamEl.logo[0].original} alt='' />,
          <p key='2'>{teamEl.name}</p>,
          <p key='3'>{teamEl.region}</p>,
          <a className={styles.participantsLink} key='4' href='#'>
            {teamEl.participants + ' участников'}
          </a>,
          <p key='5'>{teamEl.type}</p>,
          <p key='6'>{formatSingleDate(teamEl.registration ?? new Date())}<br />{parseTimeFromDate(teamEl.registration)}</p>,
        ],
      }
    })
  }

  return (
    <div className={styles.teamsSection}>
      <h4>Ватаги и коллективы</h4>
      <div className={styles.headTeams}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего групп по выбранным фильтрам: 15</p>
      {view === 'list' && breakpoint !== 'S' ? (
        <CustomTable
          className={styles.teamsTable}
          rowData={formatEventsTableData([])}
          colTitles={tableTitles}
          initialVisibleRows={1}
          rowClickHandler={rowClickHandler}
        />
      ) : (
        <MobileList
          items={[]}
          renderItem={TeamCard}
          classListItems={styles.teamsTab}
          defaultVisibleCount={3}
          classNameBtn={styles.showMoreBtnTab}
        />
      )}
    </div>
  )
}

