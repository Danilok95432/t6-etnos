import { type FC } from 'react'

import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { CustomText } from 'src/components/custom-text/custom-text'
import {
  formatDateRange,
  formatDateToRussian,
  mainFormatDate,
  parseTimeFromDate,
} from 'src/helpers/utils'
import { EventStatus } from 'src/components/event-status/event-status'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import cn from 'classnames'
import skeleton from 'src/assets/img/skeleton-img.png'

type EventPosterProps = {
  posterEventId: string
}

export const EventPoster: FC<EventPosterProps> = ({ posterEventId }) => {
  const { data: eventInfo } = useGetEventByIdQuery(posterEventId ?? null)
  const breakPoint = useBreakPoint()
  return (
    <div className={styles.eventPoster}>
      <div className={styles.eventPosterInfo}>
        <h2>{eventInfo?.title}</h2>
        <FlexRow className={styles.topLineEvent}>
          <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
            {eventInfo?.date && eventInfo.date.length > 1
              ? formatDateRange(eventInfo?.date as [Date, Date])
              : mainFormatDate(eventInfo?.date[0])}
          </CustomText>
          <div className={styles.dot}></div>
          <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
            {eventInfo?.event_type_name}
          </CustomText>
          <div className={styles.dot}></div>
          <EventStatus className={styles.status} statusCode={eventInfo?.status} />
          <div className={cn(styles.dot, styles._red)}></div>
          <CustomText
            className={styles.ageRating}
            $fontSize={breakPoint === 'S' ? '18px' : '16px'}
            $color='#DE0008'
          >
            {eventInfo?.ageRating}+
          </CustomText>
        </FlexRow>
        <CustomText $lineHeight='1.3' $margin='0 0 30px 0' className={styles.infoBlockText}>
          {eventInfo?.description}
        </CustomText>
        <p className={styles.eventTime}>
          {eventInfo?.date
            ? `Начало: ${formatDateToRussian(eventInfo?.date[0])}, в ${parseTimeFromDate(eventInfo?.date[0])}`
            : 'Нет информации о времени начала'}
        </p>
      </div>
      <div className={styles.eventPosterImg}>
        {eventInfo?.mainphoto[0]?.original ? (
          <img src={eventInfo?.mainphoto[0]?.original} alt={eventInfo?.title} />
        ) : (
          <img className={styles.skeleton} src={skeleton} alt={eventInfo?.title} />
        )}
      </div>
    </div>
  )
}

