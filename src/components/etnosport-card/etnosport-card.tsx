import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { FC } from 'react'
import { EtnosportCardItem } from 'src/types/about'
import { AppRoute } from 'src/routes/main-routes/consts'
import cn from 'classnames'
import { FlexRow } from '../flex-row/flex-row'

type EtnosportCardProps = {
  className?: string
} & EtnosportCardItem

export const EtnosportCard: FC<EtnosportCardProps> = ({
  id,
  photo,
  title,
  type,
  teams,
  participants,
  className,
}) => {
  return (
    <Link to={`/${AppRoute.About}/${AppRoute.AboutEtnosport}/${1}`} aria-label='Переход на страницу события' title={title}>
      <figure className={cn(styles.etnoItem, className)}>
        <div className={styles.etnoCardImg}>
          {
            photo && photo.length > 0 ?
            <img src={photo[0]?.original} alt={title} width={415} height={256} loading='lazy' />
            :
            <img src="src/assets/img/skeleton.img" alt="" />
          }
        </div>
        <figcaption className={cn(styles.etnoContent)}>
          <h2 className={styles.title}>{title}</h2>
          <FlexRow className={styles.etnoContentRow}>
            <span className={styles.etnoType}>{type}</span>
            {teams && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.etnoTeams}>{`Всего ватаг: ${teams}`}</span>
              </>
            )}
            {participants && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.etnoParticipants}>{`Всего участников: ${participants}`}</span>
              </>
            )}
          </FlexRow>
        </figcaption>
      </figure>
    </Link>
  )
}
