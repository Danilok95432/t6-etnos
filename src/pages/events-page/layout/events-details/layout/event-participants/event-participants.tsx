import { useState, type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import styles from './index.module.scss'
import { FilterPanel } from './components/filter-panel/filterPanel'
import { ParticipantCard } from 'src/components/participant-card/participant-card'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { ParticipantItem } from 'src/types/participants'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'

export const EventParticipants: FC = () => {
  const eventDataParticipants = [
    {
      id: '1',
      photo: [
        {
          id: '1',
          original:
            'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=13',
          thumbnail: '',
          author: '',
          title: '',
        },
      ],
      name: 'Даниил Гусев',
      alias: '«Гусь»',
      region: 'Татарстан, республика (16)',
      age: '30',
      group: 'Название группы участников',
      type: ['Спортсмен'],
      registration: '2025-06-01T14:30:00+03:00',
    },
    {
      id: '2',
      photo: [
        {
          id: '2',
          original:
            'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=13',
          thumbnail: '',
          author: '',
          title: '',
        },
      ],
      name: 'Роман Романов',
      alias: '«Зельда»',
      region: 'Татарстан, республика (16)',
      age: '25',
      group: 'Название группы участников',
      type: ['Спортсмен'],
      registration: '2025-06-01T14:30:00+03:00',
    },
    {
      id: '3',
      photo: [
        {
          id: '3',
          original:
            'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=13',
          thumbnail: '',
          author: '',
          title: '',
        },
      ],
      name: 'Петр Петров',
      alias: '«Зельда»',
      region: 'Татарстан, республика (16)',
      age: '1',
      group: 'Название группы участников',
      type: ['Спортсмен'],
      registration: '2025-06-01T14:30:00+03:00',
    },
    {
      id: '4',
      photo: [
        {
          id: '4',
          original:
            'https://avatars.mds.yandex.net/i?id=37bc60752fd00c0bb9258260ded299c7_l-7548061-images-thumbs&n=13',
          thumbnail: '',
          author: '',
          title: '',
        },
      ],
      name: 'Егор Глебов',
      alias: '«Зельда»',
      region: 'Татарстан, республика (16)',
      age: '21',
      group: 'Название группы участников',
      type: ['Спортсмен'],
      registration: '2025-06-01T14:30:00+03:00',
    },
  ]

  const breakpoint = useBreakPoint()

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

  const tableTitles = [
    'ID',
    'Фото',
    'Имя, фамилия, прозвище',
    'Регион',
    'Возраст',
    'Группа',
    'Тип участия',
    'Регистрация',
  ]
  const formatEventsTableData = (participants: ParticipantItem[]) => {
    return eventDataParticipants.map((participantEl) => {
      return {
        rowId: participantEl.id,
        cells: [
          <p key='0' className={styles.idCell}>{participantEl.id}</p>,
          <img key='1' src={participantEl.photo[0].original} alt='' />,
          <p key='2'>{participantEl.name}</p>,
          <p key='3'>{participantEl.region}</p>,
          <p className={styles.ageCell} key='4'>
            {participantEl.age}
          </p>,
          <p key='5'>{participantEl.group}</p>,
          <p key='6'>{participantEl.type}</p>,
          <p key='7'>{formatSingleDate(participantEl.registration ?? new Date())}<br />{parseTimeFromDate(participantEl.registration)}</p>,
        ],
      }
    })
  }

  return (
    <div className={styles.participantsSection}>
      <h4>Участники</h4>
      <div className={styles.headParticipant}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего участников по выбранным фильтрам: 15</p>
      {view === 'list' ? (
        <CustomTable
          className={styles.participantsTable}
          rowData={formatEventsTableData(eventDataParticipants)}
          colTitles={tableTitles}
          initialVisibleRows={1}
        />
      ) : (
        <MobileList
          items={eventDataParticipants}
          renderItem={ParticipantCard}
          classListItems={styles.participantsTab}
          defaultVisibleCount={3}
          classNameBtn={styles.showMoreBtnTab}
        />
      )}
    </div>
  )
}

