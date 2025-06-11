import { type CardNewsItem } from 'src/types/news'
import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'
import { mainFormatDate } from 'src/helpers/utils'

import styles from './index.module.scss'

type NewsCardProps = {
	className?: string
	mainStatus?: boolean
} & CardNewsItem

export const NewsCard: FC<NewsCardProps> = ({
	id,
	mainphoto,
	title,
	date,
	desc,
	mainStatus,
	className,
}) => {
	if (mainStatus) {
		return (
			<Link
				className={cn(styles.newsItem, className)}
				to={`/${AppRoute.News}/${id}`}
				aria-label={title}
				title={title}
			>
				<figure className={styles.mainNewsContainer}>
					<div className={styles.newsImgWrapper}>
						<img src={mainphoto[0]?.original} alt={title} width={286} height={160} loading='lazy' />
					</div>
					<figcaption className={styles.newsItemContent}>
						<h4 className={styles.newsItemTitle}>{title}</h4>
						<p className={styles.newsDate}>{mainFormatDate(date)}</p>
						<p className={styles.newsDesc}>{desc}</p>
					</figcaption>
				</figure>
			</Link>
		)
	}
	return (
		<Link
			className={styles.newsItem}
			to={`/${AppRoute.News}/${id}`}
			aria-label={title}
			title={title}
		>
			<figure>
				<div className={styles.newsImgWrapper}>
					<img src={mainphoto[0]?.original} alt={title} width={286} height={160} loading='lazy' />
				</div>
				<figcaption className={styles.newsItemContent}>
					<h4 className={styles.newsItemTitle}>{title}</h4>
					<p className={styles.newsDate}>{mainFormatDate(date)}</p>
					<p className={styles.newsDesc}>{desc}</p>
				</figcaption>
			</figure>
		</Link>
	)
}
