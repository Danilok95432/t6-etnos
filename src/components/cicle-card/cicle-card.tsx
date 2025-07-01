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
  title,
  photo,
  type,
  since,
  countEvents,
  desc,
  className,
}) => {
  return (
    <Link to={`/${AppRoute.Cicles}/${1}`} aria-label='Переход на страницу цикла' title={title}>
      <figure className={cn(styles.cicleItem, className)}>
        <div className='cicle-item-img'>
          <img src={photo[0]?.original} alt={title} width={415} height={256} loading='lazy' />
        </div>
        <figcaption className={cn(styles.cicleContent, 'cicle-card-content')}>
          <h3 className={styles.cicleTitle}>{title}</h3>
          <p className={styles.cicleDate}>{since}</p>
          <p className={styles.cicleType}>{type}</p>
          <p className={styles.cicleType}>
            {`Всего ${countEvents} событий`}
          </p>
          {desc && <p className={styles.cicleDesc}>{desc}</p>}
        </figcaption>
      </figure>
    </Link>
  )
}
