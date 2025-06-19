import { useState } from "react"
import { useBreakPoint } from "src/hooks/useBreakPoint/useBreakPoint"
import styles from './index.module.scss'
import { FilterPanel } from "./components/FilterPanel/FilterPanel"
import { CustomTable } from "src/components/custom-table/custom-table"
import { ParticipantGroup } from "src/types/participants"

export const ParticipantGroups = () => {
  const groups = [
    {
      id: '1',
      name: 'Татар Батыр, народные танцы',
      role: 'Руководитель',
      category: 'Музыкально-фольклорный коллектив',
      participants: '30',
      subgroup: 'Нет',
      rating: '340 (18 событий)',
    },
    {
      id: '2',
      name: 'Татар Батыр, народные танцы',
      role: 'Руководитель',
      category: 'Музыкально-фольклорный коллектив',
      participants: '30',
      subgroup: 'Нет',
      rating: '340 (18 событий)',
    },
    {
      id: '3',
      name: 'Татар Батыр, народные танцы',
      role: 'Руководитель',
      category: 'Музыкально-фольклорный коллектив',
      participants: '30',
      subgroup: 'Нет',
      rating: '340 (18 событий)',
    },
    {
      id: '4',
      name: 'Татар Батыр, народные танцы',
      role: 'Руководитель',
      category: 'Музыкально-фольклорный коллектив',
      participants: '30',
      subgroup: 'Нет',
      rating: '340 (18 событий)',
    },
  ]

  const breakpoint = useBreakPoint()

  const [searchName, setSearchName] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('0')

  const options = {
    name: searchName,
    setSearchName: setSearchName,
    type: searchType,
    setSearchType: setSearchType,
  }

  const tableTitles = [
    '№',
    'Название группы',
    'Роль в группе',
    'Категория группы',
    'Участники',
    'Подгруппы',
    'Рейтинг',
  ]
  const formatEventsTableData = (participants: ParticipantGroup[]) => {
    return groups.map((groupEl) => {
      return {
        rowId: groupEl.id,
        cells: [
          <p key='0' className={styles.idCell}>{groupEl.id}</p>,
          <p key='1'>{groupEl.name}</p>,
          <p key='2'>{groupEl.role}</p>,
          <p key='3'>{groupEl.category}</p>,
          <p key='4' className={styles.middleCell}>{groupEl.participants}</p>,
          <p key='5' className={styles.middleCell}>{groupEl.subgroup}</p>,
          <p key='6'>{groupEl.rating}</p>,
        ],
      }
    })
  }
  return(
    <div className={styles.groupsSection}>
      <h4>Группы</h4>
      <div className={styles.headGroups}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего групп по выбранным фильтрам: 15</p>
      <CustomTable
        className={styles.groupsTable}
        rowData={formatEventsTableData(groups)}
        colTitles={tableTitles}
      />
    </div>
  )
}