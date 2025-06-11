import { TeamItem } from 'src/types/teams'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

import styles from './index.module.scss'

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
		<Link
			className={styles.newsItem}
			to={`/${AppRoute.News}/${id}`}
			aria-label={id}
			title={id}
		>
			<figure>
				<div className={styles.newsImgWrapper}>
					<img src={logo[0]?.original} alt={name} width={286} height={160} loading='lazy' />
				</div>
				<figcaption className={styles.newsItemContent}>
				</figcaption>
			</figure>
		</Link>
	)
}
