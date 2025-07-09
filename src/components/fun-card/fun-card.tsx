import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { FC } from 'react'
import cn from 'classnames'
import { FlexRow } from '../flex-row/flex-row'
import skeleton from 'src/assets/img/skeleton-img.png'
import { VidCardItem } from 'src/types/vids'
import { AppRoute } from 'src/routes/main-routes/consts'
import { SingleVidIconSVG } from 'src/UI/icons/singleVidIconSVG'
import { GroupVidIconSVG } from 'src/UI/icons/groupVidIconSVG'

type FunCardProps = {
  className?: string
} & VidCardItem

export const FunCard: FC<FunCardProps> = ({
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
    <Link to={`/${AppRoute.About}/${AppRoute.AboutFun}/${id}`} aria-label='Переход на страницу события' title={title}>
      <figure className={cn(styles.funItem, className)}>
        <div className={styles.funCardImg}>
          {
            mainphoto && mainphoto.length > 0 ?
            <img src={mainphoto[0]?.original} alt={title} width={415} height={256} loading='lazy' />
            :
            <img className={styles.skeletonImg} src={skeleton} alt="" />
          }
        </div>
        <figcaption className={cn(styles.funContent)}>
          <h2 className={styles.title}>{title}</h2>
          <FlexRow className={styles.funContentRow}>
            <span className={styles.funType}>{is_single ? (
              <FlexRow className={styles.vidRow}>
                <SingleVidIconSVG />
                <p>Одиночный вид</p>
              </FlexRow>
            ) : (
              <FlexRow className={styles.vidRow}>
                <GroupVidIconSVG color='#D5D5D5' />
                <p>Групповой вид</p>
              </FlexRow>
            )}</span>
            {is_group && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.funTeams}>{`Всего ватаг: ${groups_count}`}</span>
              </>
            )}
            <div className={styles.dot}></div>
            <span className={styles.funParticipants}>{`Всего участников: ${users_count}`}</span>
          </FlexRow>
        </figcaption>
      </figure>
    </Link>
  )
}
