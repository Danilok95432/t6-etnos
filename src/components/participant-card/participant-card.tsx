import { ParticipantItem } from 'src/types/participants'
import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'
import { mainFormatDate } from 'src/helpers/utils'

import styles from './index.module.scss'

type ParticipantCardProps = {
	className?: string
} & ParticipantItem

export const ParticipantCard: FC<ParticipantCardProps> = ({
	id,
	group,
	age,
	type,
	photo,
	name,
  region,
  registration,
	className,
}) => {
	return (
		<Link
			className={styles.newsItem}
			to={`/${AppRoute.News}/${id}`}
			aria-label={id}
			title={id}
		>
			<figure>
				<div className={styles.newsImgWrapper}>
					<img src={photo[0]?.original} alt={name} width={286} height={160} loading='lazy' />
				</div>
				<figcaption className={styles.newsItemContent}>
				</figcaption>
			</figure>
		</Link>
	)
}
