import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { FC } from 'react'
import { FunCardItem } from 'src/types/about'
import { AppRoute } from 'src/routes/main-routes/consts'
import cn from 'classnames'
import { FlexRow } from '../flex-row/flex-row'
import skeleton from 'src/assets/img/skeleton-img.png'

type FunCardProps = {
  className?: string
} & FunCardItem

export const FunCard: FC<FunCardProps> = ({
  id,
  photo,
  title,
  type,
  teams,
  participants,
  className,
}) => {
  return (
    <Link to={`${id}`} aria-label='Переход на страницу события' title={title}>
      <figure className={cn(styles.funItem, className)}>
        <div className={styles.funCardImg}>
          {
            photo && photo.length > 0 ?
            <img src={photo[0]?.original} alt={title} width={415} height={256} loading='lazy' />
            :
            <img className={styles.skeletonImg} src={skeleton} alt="" />
          }
        </div>
        <figcaption className={cn(styles.funContent)}>
          <h2 className={styles.title}>{title}</h2>
          <FlexRow className={styles.funContentRow}>
            <span className={styles.funType}>{type}</span>
            {teams && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.funTeams}>{`Всего ватаг: ${teams}`}</span>
              </>
            )}
            {participants && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.funParticipants}>{`Всего участников: ${participants}`}</span>
              </>
            )}
          </FlexRow>
        </figcaption>
      </figure>
    </Link>
  )
}
