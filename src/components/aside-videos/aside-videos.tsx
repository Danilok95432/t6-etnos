import React, { type FC } from 'react'
import { type VideoItem } from 'src/types/videos'
import cnBind from 'classnames/bind'

import styles from './index.module.scss'
import { mainFormatDate } from 'src/helpers/utils'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

type AsideVideosProps = {
	videosList?: VideoItem[]
	orient?: 'horizontal' | 'vertical'
	title?: string
	currentVideoId?: string
}
export const AsideVideos: FC<AsideVideosProps> = ({
	videosList,
	title,
	orient = 'vertical',
	currentVideoId = 0,
}) => {
	const cx = cnBind.bind(styles)

	if (!videosList) return null
	return (
		<aside className={cx(styles.asideVideos, { [styles._horizontal]: orient === 'horizontal' })}>
			{title && <h4>{title}</h4>}
			{orient === 'vertical' ? (
				<div className={styles.videosList}>
					{[...videosList]
						.filter((el) => el.id !== currentVideoId)
						.map((videoEl) => (
							<Link to={`/${AppRoute.Videos}/${videoEl.id}`} key={videoEl.id}>
								<div className={styles.videoCardAside}>
									<img src={videoEl.mainphoto[0]?.original} alt={title} />
									{videoEl.date && (
										<span className={styles.videoDate}>
											{mainFormatDate(new Date(videoEl.date), 'dd.MM.yyyy')}
										</span>
									)}
								</div>
								<p className={styles.videoTitle}>{videoEl.title}</p>
							</Link>
						))}
				</div>
			) : (
				<div className={styles.videosList}>
					{[...videosList]
						.filter((el) => el.id !== currentVideoId)
						.slice(0, 2)
						.map((videoEl) => (
							<Link to={`/${AppRoute.Videos}/${videoEl.id}`} key={videoEl.id}>
								<div className={styles.videoCardAside}>
									<img src={videoEl.mainphoto[0]?.original} alt={title} />
									{videoEl.date && (
										<span className={styles.videoDate}>
											{mainFormatDate(new Date(videoEl.date), 'dd.MM.yyyy')}
										</span>
									)}
								</div>
								<p className={styles.videoTitle}>{videoEl.title}</p>
							</Link>
						))}
				</div>
			)}
		</aside>
	)
}
