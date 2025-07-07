import { type FC } from 'react'
import { type CardEventItem } from 'src/types/events'

import cn from 'classnames'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

import { getDayOfWeek, mainFormatDate, parseTimeFromDate } from 'src/helpers/utils'

import styles from './index.module.scss'
import { EventStatus } from '../event-status/event-status'
import { CardCicleItem } from 'src/types/cicles'

type EventItemProps = {
  className?: string
} & CardCicleItem

export const CicleCard: FC<EventItemProps> = ({
  id,
  cicle_name,
  mainphoto,
  cicle_dates,
  cicle_type_name,
  cicle_short,
  events_count,
  className,
}) => {
  return (
    <Link to={`/${AppRoute.Cicles}/${1}`} aria-label='Переход на страницу цикла' title={cicle_name}>
      <figure className={cn(styles.cicleItem, className)}>
        <div className='cicle-item-img'>
          <img src={mainphoto[0]?.original} alt={cicle_name} width={415} height={256} loading='lazy' />
        </div>
        <figcaption className={cn(styles.cicleContent, 'cicle-card-content')}>
          <h3 className={styles.cicleTitle}>{cicle_name}</h3>
          <p className={styles.cicleDate}>{cicle_dates}</p>
          <p className={styles.cicleType}>{cicle_type_name}</p>
          <p className={styles.cicleType}>
            {`Всего ${events_count} событий`}
          </p>
          {cicle_short && <p className={styles.cicleDesc}>{cicle_short}</p>}
        </figcaption>
      </figure>
    </Link>
  )
}
