import React, { type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { VideoCard } from 'src/components/video-card/video-card'
import { useGetEventVideosByIdQuery } from 'src/store/events/events.api'
import { useParams } from 'react-router-dom'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const EventVideos: FC = () => {
	const { id = '' } = useParams()

	const { data: videos } = useGetEventVideosByIdQuery(id)
	const breakpoint = useBreakPoint()

	return (
		<div className={styles.videosTabContent}>
			<h4>Видеолента</h4>
			<GridRow
				$template={
					breakpoint === 'S'
						? 'auto / repeat(auto-fit, minmax(300px, 300px))'
						: 'auto / repeat(auto-fit, minmax(245px, 245px))'
				}
				$gap='20px'
			>
				{videos?.map((videoEl) => <VideoCard key={videoEl.id} {...videoEl} />)}
			</GridRow>
		</div>
	)
}
