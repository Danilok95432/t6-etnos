import { TeamItem } from 'src/types/teams'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

import styles from './index.module.scss'
import { FlexRow } from '../flex-row/flex-row'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'

type TeamCardProps = {
	className?: string
} & TeamItem

export const TeamCard: FC<TeamCardProps> = ({
	id,
	type,
	logo,
	name,
  region,
  registration,
  participants,
	className,
}) => {
	return (
		<Link className={styles.teamItem} to={`/${AppRoute.News}/${id}`} aria-label={id} title={id}>
      <figure>
        <figcaption className={styles.teamItemContent}>
          <FlexRow className={styles.headTeamCard}>
            <div className={styles.teamImgWrapper}>
              <img src={logo[0]?.original} width={286} height={160} loading='lazy' />
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.name}>{name}</p>
							<p>{region}</p>
            </div>
          </FlexRow>
					<FlexRow className={styles.groupInfo}>
						<div className={styles.groups}>
							<p>Участников</p>
							<a href='#'>{participants.length + ' участников'}</a>
						</div>
						<div className={styles.types}>
							<p>Роль группы</p>
							<a href='#'>{type}</a>
						</div>
					</FlexRow>
					<FlexRow className={styles.footerCard}>
						<p>Регистрация: {`${formatSingleDate(registration ?? new Date())}, ${parseTimeFromDate(registration)}`}</p>
						<p>ID: {id}</p>
					</FlexRow>
        </figcaption>
      </figure>
    </Link>
	)
}
