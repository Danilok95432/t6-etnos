import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { FC } from 'react'
import { AppRoute } from 'src/routes/main-routes/consts'
import cn from 'classnames'
import { FlexRow } from '../flex-row/flex-row'
import skeleton from 'src/assets/img/skeleton-img.png'
import { VidCardItem } from 'src/types/vids'

type EtnosportCardProps = {
  className?: string
} & VidCardItem

export const EtnosportCard: FC<EtnosportCardProps> = ({
  desc,
  groups_count,
  id,
  is_etnosport,
  is_group,
  is_single,
  mainphoto,
  rule,
  title,
  users_count,
  className,
}) => {
  return (
    <Link to={`${id}`} aria-label='Переход на страницу этноспорта' title={title}>
      <figure className={cn(styles.etnoItem, className)}>
        <div className={styles.etnoCardImg}>
          {
            mainphoto && mainphoto.length > 0 ?
            <img src={mainphoto[0]?.original} alt={title} width={415} height={256} loading='lazy' />
            :
            <img className={styles.skeletonImg} src={skeleton} alt="" />
          }
        </div>
        <figcaption className={cn(styles.etnoContent)}>
          <h2 className={styles.title}>{title}</h2>
          <FlexRow className={styles.etnoContentRow}>
            <span className={styles.etnoType}>{is_single ? 'Одиночный вид' : 'Групповой вид'}</span>
            {is_group && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.etnoTeams}>{`Всего ватаг: ${groups_count}`}</span>
              </>
            )}
            <div className={styles.dot}></div>
            <span className={styles.etnoParticipants}>{`Всего участников: ${users_count}`}</span>
          </FlexRow>
        </figcaption>
      </figure>
    </Link>
  )
}
