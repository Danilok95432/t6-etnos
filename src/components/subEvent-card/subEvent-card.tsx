import { FC } from 'react'
import styles from './index.module.scss'
import { EtnosportSubEventItem } from 'src/types/etnosport'
import skeleton from 'src/assets/img/skeleton-img.png'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { formatSingleDate } from 'src/helpers/utils'

type SubEventCardProps = {
  className?: string
} & EtnosportSubEventItem

export const SubEventCard: FC<SubEventCardProps> = ({
  id,
  date,
  subEventTitle,
  place,
  className,
}) => {
  return (
    <figure key={id} className={styles.listTabCard}>
      <div className={styles.imgWrapper}>
        <img src={skeleton} alt='' />
      </div>
      <figcaption>
        <h3 className={styles.eventTitle}>{subEventTitle}</h3>
        <p className={styles.eventDate}>{formatSingleDate(date)}</p>
        <p className={styles.eventPlace}>{place}</p>
        <MainButton as='route' to={'#'} className={styles.requestBtn}>
          Подать заявку
        </MainButton>
      </figcaption>
    </figure>
  )
}
