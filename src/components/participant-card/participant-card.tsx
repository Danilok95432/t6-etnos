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
  group,
  age,
  type,
  photo,
  alias,
  name,
  region,
  registration,
  className,
}) => {
  return (
    <Link className={styles.participantItem} to={`/${AppRoute.News}/${id}`} aria-label={id} title={id}>
      <figure>
        <figcaption className={styles.participantItemContent}>
          <FlexRow>
            <div className={styles.participantImgWrapper}>
              <img src={photo[0]?.original} width={286} height={160} loading='lazy' />
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.name}>{name.split(' ')[0]} <br /> {name.split(' ')[1]}</p>
							<div className={styles.additionalInfo}>
								<p>
									{alias}, {getAgeString(age)}
								</p>
								<p>{region}</p>
							</div>
            </div>
          </FlexRow>
					<FlexRow>
						<div className={styles.groups}>
							<p>Группы</p>
							<p>{group}</p>
						</div>
						<div className={styles.types}>
							<p>Тип участия</p>
							<p>{type}</p>
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
