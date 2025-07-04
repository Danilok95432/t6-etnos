import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

import styles from './index.module.scss'
import { FlexRow } from '../flex-row/flex-row'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'
import { HeroesGroupItem } from 'src/types/heroes'

type TeamCardProps = {
	className?: string
} & HeroesGroupItem

export const TeamCard: FC<TeamCardProps> = ({
	id,
	group_name,
  region_name,
  reg_date,
  users_count,
	className,
}) => {
	return (
		<Link className={styles.teamItem} to={`/${AppRoute.Teams}/${id}`} aria-label={id} title={id}>
      <figure>
        <figcaption className={styles.teamItemContent}>
          <FlexRow className={styles.headTeamCard}>
            <div className={styles.teamImgWrapper}>
              <img src='#' width={286} height={160} loading='lazy' />
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.name}>{group_name}</p>
							<p>{region_name}</p>
            </div>
          </FlexRow>
					<FlexRow className={styles.groupInfo}>
						<div className={styles.groups}>
							<p>Участников</p>
							<a href='#'>{users_count + ' участников'}</a>
						</div>
						{/*
              events && (
                <div className={styles.events}>
                  <p>События</p>
                  <p>{''}</p>
                </div>
              )
								*/
            }
						<div className={styles.types}>
							<p>Роль группы</p>
							<a href='#'>{''}</a>
						</div>
					</FlexRow>
					<FlexRow className={styles.footerCard}>
						<p>Регистрация: {`${formatSingleDate(reg_date ?? new Date())}, ${parseTimeFromDate(reg_date)}`}</p>
						<p>ID: {id}</p>
					</FlexRow>
        </figcaption>
      </figure>
    </Link>
	)
}
