import { useState } from 'react'
import styles from './index.module.scss'
import { useGetEventsMonthsQuery } from 'src/store/events/events.api'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { EventCard } from 'src/components/event-card/event-card'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { SwitcherView } from 'src/components/switcherView/switcherView'
import { EtnosportSubEventItem } from 'src/types/etnosport'
import { formatSingleDate } from 'src/helpers/utils'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { SubEventCard } from 'src/components/subEvent-card/subEvent-card'

export const EtnosportEvents = () => {
  const [activeMonth, setActiveMonth] = useState('0')
  const [view, setView] = useState<string>('list')
  const { data: eventsList } = useGetEventsMonthsQuery({
    date: activeMonth,
    category: '',
  })

  const subEvent = [
    {
      id: '1',
      date: '2025-08-23T08:00:00+03:00',
      mainEvent: 'Атмановские кулачки 2024',
      subEventTitle:
        'Общее построение. Приветственное слово генерала армии Нечипоренко. Объявление администрации о том, что...',
      place: 'Спортивный комплекс «Лужники», мини-футбольное поле №14 ',
      request: false,
    },
    {
      id: '2',
      date: '2025-08-23T08:00:00+03:00',
      mainEvent: 'Атмановские кулачки 2024',
      subEventTitle: 'Финал чемпионата России по киле',
      place: 'Спортивный комплекс «Лужники», мини-футбольное поле №14 ',
      request: true,
    },
    {
      id: '3',
      date: '2025-08-23T08:00:00+03:00',
      mainEvent: 'Атмановские кулачки 2024',
      subEventTitle: 'Секция «Этноспорт и правопорядок»',
      place: 'Спортивный комплекс «Лужники», мини-футбольное поле №14 ',
      request: true,
    },
    {
      id: '4',
      date: '2025-08-23T08:00:00+03:00',
      mainEvent: 'Атмановские кулачки 2024',
      subEventTitle: 'Открытый хоровод',
      place: 'Спортивный комплекс «Лужники», мини-футбольное поле №14 ',
      request: false,
    },
  ]

  const breakpoint = useBreakPoint()

  const tableTitles = ['Дата проведения', 'Главное событие', 'Подсобытие', 'Заявка']
  const formatEventsTableData = (subEvents: EtnosportSubEventItem[]) => {
    return subEvents?.map((subEvent) => {
      return {
        rowId: subEvent.id,
        cells: [
          <p key='0'>{formatSingleDate(subEvent.date ?? new Date())}</p>,
          <p key='1'>{subEvent.mainEvent}</p>,
          <p key='2'>{subEvent.subEventTitle}</p>,
          <p key='3'>
            {subEvent.request && (
              <MainButton key='3' className={styles.requestBtn}>
                Подать заявку
              </MainButton>
            )}
          </p>,
        ],
      }
    })
  }

  return (
    <div className={styles.etnosportEventsPage}>
      <div className={styles.filteredListWrapper}>
        <h4>Cобытия</h4>
        {breakpoint === 'S' && eventsList ? (
          <MobileList
            items={eventsList}
            renderItem={EventCard}
            classListItems={styles.eventsList}
          />
        ) : (
          <div className={styles.eventsList}>
            {eventsList?.map((eventEl) => (
              <EventCard key={eventEl.id} {...eventEl} className={styles.eventCard} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.subEvents}>
        <div className={styles.headSubEvents}>
          <h4>Подсобытия</h4>
          <SwitcherView view={view} switchView={setView} />
        </div>
        {view === 'list' && subEvent ? (
          <>
            {breakpoint === 'S' ? (
              <div className={styles.subEventList}>
                {subEvent.map((event) => {
                  return (
                    <div key={event.id} className={styles.subEvent}>
                      <p className={styles.subEventDate}>{formatSingleDate(event.date)}</p>
                      <p className={styles.subEventMain}>{event.mainEvent}</p>
                      <p className={styles.subEventTitle}>{event.subEventTitle}</p>
                      {event.request && (
                        <MainButton className={styles.requestBtn}>Подать заявку</MainButton>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <CustomTable
                className={styles.subEventsTable}
                rowData={formatEventsTableData(subEvent)}
                colTitles={tableTitles}
              />
            )}
          </>
        ) : (
          <div className={styles.subEventsTab}>
            {subEvent.map((event) => {
              return <SubEventCard key={event.id} {...event} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
