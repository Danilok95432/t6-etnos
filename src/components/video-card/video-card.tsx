import { type FC } from 'react'
import { type VideoItem } from 'src/types/videos'

import cn from 'classnames'
import { Link } from 'react-router-dom'

import { AppRoute } from 'src/routes/main-routes/consts'
import { mainFormatDate } from 'src/helpers/utils'

import styles from './index.module.scss'

type VideoCardProps = {
	className?: string
} & VideoItem

export const VideoCard: FC<VideoCardProps> = ({
	className,
	id,
	title,
	mainphoto,
	duration,
	date,
}) => {
	return (
		<Link className={cn(styles.videoCard, className)} to={`/${AppRoute.Videos}/${id}`}>
			<div className={styles.videoThumbWrapper}>
				<img src={mainphoto[0]?.original} alt={title} />
				{date && (
					<span className={styles.videoDate}>{mainFormatDate(new Date(date), 'dd.MM.yyyy')}</span>
				)}
			</div>
			<p className={styles.videoTitle}>{title}</p>
		</Link>
	)
}
