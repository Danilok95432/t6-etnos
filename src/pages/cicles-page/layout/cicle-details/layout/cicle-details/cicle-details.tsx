import { RefObject, useEffect, useMemo, useRef, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'

import styles from './index.module.scss'
import { useGetEventsMonthsQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { EventCard } from 'src/components/event-card/event-card'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { useGetCicleInfoQuery } from 'src/store/cicles/cicles.api'

export const CicleDetails: FC = () => {
  const { id = '' } = useParams()
  const { data: cicleInfo } = useGetCicleInfoQuery(id ?? '')
  const { data: eventsList } = useGetEventsMonthsQuery({
    date: '',
    category: '',
  })
  const breakpoint = useBreakPoint()

  return (
    <div className={styles.cicleDetailTab}>
      <h2>Главная</h2>
      <div className={cicleInfo?.fulltext ? styles.cicleDescs : ''}>
        {cicleInfo?.fulltext && (
          <div dangerouslySetInnerHTML={{ __html: cicleInfo?.fulltext }} />
        )}
      </div>
      <div className={styles.eventsSection}>
        <h4>События цикла</h4>
        {breakpoint === 'S' && eventsList ? (
          <MobileList items={eventsList} renderItem={EventCard} classListItems={styles.eventsList} />
        ) : (
          <div className={styles.eventsList}>
            {eventsList?.map((eventEl) => (
              <EventCard key={eventEl.id} {...eventEl} className={styles.eventCard} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
