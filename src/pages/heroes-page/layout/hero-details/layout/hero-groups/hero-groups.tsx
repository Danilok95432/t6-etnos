import { useState, type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import styles from './index.module.scss'
import { ParticipantCard } from 'src/components/participant-card/participant-card'
import { TeamCard } from 'src/components/team-card/team-card'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { TeamItem } from 'src/types/teams'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'
import { FilterPanel } from './components/filterPanel/filterPanel'
import { useNavigate } from 'react-router-dom'
import { useGetHeroesGroupsQuery } from 'src/store/heroes/heroes.api'
import { Loader } from 'src/components/loader/loader'
import { HeroesGroupItem } from 'src/types/heroes'
import { HeroGroupCard } from 'src/components/hero-group-card/hero-group-card'

export const HeroGroups: FC = () => {
  const { data: groupsData } = useGetHeroesGroupsQuery(null)

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
    'ID',
    'Лого',
    'Название группы',
    'Регион',
    'Участников',
    'События',
    'Тип группы',
    'Регистрация',
  ]
  const formatEventsTableData = (teams: HeroesGroupItem[]) => {
    return teams.map((teamEl) => {
      return {
        rowId: teamEl.id,
        cells: [
          <p key='0' className={styles.idCell}>{teamEl.id}</p>,
          <img key='1' src='#' alt='' />,
          <p key='2'>{teamEl.group_name}</p>,
          <p key='3'>{teamEl.region_name}</p>,
          <a className={styles.participantsLink} key='4' href='#'>
            {teamEl.users_count + ' участников'}
          </a>,
          <p>{'3 события'}</p>,
          <p key='5'>{'Тип'}</p>,
          <p key='6'>{formatSingleDate(teamEl.reg_date ?? new Date())}<br />{parseTimeFromDate(teamEl.reg_date)}</p>,
        ],
      }
    })
  }
  if (!groupsData) return <Loader />
  return (
    <div className={styles.teamsSection}>
      <h4>Группы</h4>
      <div className={styles.headTeams}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего групп по выбранным фильтрам: 15</p>
      {view === 'list' && breakpoint !== 'S' ? (
        <CustomTable
          className={styles.teamsTable}
          rowData={formatEventsTableData(groupsData?.groups)}
          colTitles={tableTitles}
          initialVisibleRows={15}
          rowClickHandler={rowClickHandler}
        />
      ) : (
        <MobileList
          items={groupsData?.groups}
          renderItem={HeroGroupCard}
          classListItems={styles.teamsTab}
          defaultVisibleCount={3}
          classNameBtn={styles.showMoreBtnTab}
        />
      )}
    </div>
  )
}

