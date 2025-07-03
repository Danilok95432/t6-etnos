import { ParticipantItem } from 'src/types/participants'
import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'
import { formatSingleDate, getAgeString, mainFormatDate, parseTimeFromDate } from 'src/helpers/utils'

import styles from './index.module.scss'
import { FlexRow } from '../flex-row/flex-row'

type ParticipantCardProps = {
  className?: string
} & ParticipantItem

export const ParticipantCard: FC<ParticipantCardProps> = ({
  id,
  group_name,
  age,
  user_roles,
  photo,
  firstname,
  events,
  surname,
  fathname,
  region_name,
  createdate,
  className,
}) => {
  return (
    <Link className={styles.participantItem} to={`/${AppRoute.Participants}/${id}`} aria-label={id} title={id}>
      <figure>
        <figcaption className={styles.participantItemContent}>
          <FlexRow className={styles.headCard}>
            <div className={styles.participantImgWrapper}>
              {
                photo ? <img src={photo[0]?.original} width={286} height={160} loading='lazy' /> : <img src="#" alt="" />
              }
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.name}>{surname + ' ' + firstname + ' ' + fathname}</p>
							<div className={styles.additionalInfo}>
								<p>
									{getAgeString(age)}
								</p>
								<p>{region_name}</p>
							</div>
            </div>
          </FlexRow>
					<FlexRow>
						<div className={styles.groups}>
							<p>Группы</p>
							<p>{group_name}</p>
						</div>
            {
              events && (
                <div className={styles.events}>
                  <p>События</p>
                  <p>{events}</p>
                </div>
              )
            }
						<div className={styles.types}>
							<p>Тип участия</p>
							<p>{user_roles?.map(role => role.title).join(', ')}</p>
						</div>
					</FlexRow>
					<FlexRow className={styles.footerCard}>
						<p>Регистрация: {`${formatSingleDate(createdate ?? new Date())}, ${parseTimeFromDate(createdate)}`}</p>
						<p>ID: {id}</p>
					</FlexRow>
        </figcaption>
      </figure>
    </Link>
  )
}
