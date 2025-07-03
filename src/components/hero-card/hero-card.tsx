import { HeroItem, ParticipantItem } from 'src/types/participants'
import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'
import { formatSingleDate, getAgeString, mainFormatDate, parseTimeFromDate } from 'src/helpers/utils'

import styles from './index.module.scss'
import { FlexRow } from '../flex-row/flex-row'

type ParticipantCardProps = {
  className?: string
} & HeroItem

export const HeroCard: FC<ParticipantCardProps> = ({
  id,
  age,
  photo,
  firstname,
  surname,
  fathname,
  region_name,
  createdate,
  reward,
  rewardIcon,
  nickname,
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
              <p className={styles.name}>{surname + ' ' + firstname}</p>
							<div className={styles.additionalInfo}>
								<p>
									{getAgeString(age)}
								</p>
								<p>{region_name}</p>
							</div>
            </div>
          </FlexRow>
          <FlexRow className={styles.rewardLine}>
            <img src={rewardIcon} alt="" />
            <p>reward</p>
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
