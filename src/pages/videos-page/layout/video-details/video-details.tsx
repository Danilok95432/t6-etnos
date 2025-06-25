import React, { useEffect, useRef, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { useParams } from 'react-router-dom'

import { CustomText } from 'src/components/custom-text/custom-text'
import { AsideVideos } from 'src/components/aside-videos/aside-videos'

import { useGetVideoByIdQuery, useGetVideosMonthsQuery } from 'src/store/videos/videos.api'
import { formatDateTimeSimple } from 'src/helpers/utils'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import styles from './index.module.scss'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { AppRoute } from 'src/routes/main-routes/consts'

export const VideoDetails: FC = () => {
	const { id } = useParams()
	const { data: videoDetails } = useGetVideoByIdQuery(id ?? '')
	const { data: videosList } = useGetVideosMonthsQuery({
		date: '',
		category: '',
	})

	useAdditionalCrumbs(videoDetails?.title)
	const [isSmallScreen, setIsSmallScreen] = useState(false)
	const [previewCount, setPreviewCount] = useState<number>(1)
	const contentRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 1300)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	useEffect(() => {
		const calculatePreviewCount = () => {
			if (contentRef.current) {
				const contentHeight = contentRef.current.offsetHeight
				const cardHeight = 190
				const count = Math.floor((contentHeight - 50) / cardHeight)
				setPreviewCount(Math.max(1, count))
			}
		}

		calculatePreviewCount()
		window.addEventListener('resize', calculatePreviewCount)

		return () => {
			window.removeEventListener('resize', calculatePreviewCount)
		}
	}, [videoDetails])

	if (!videoDetails) return

	return (
		<>
			<Helmet>
				<title>{videoDetails?.title}</title>
			</Helmet>
			<div className={styles.videoDetailPage}>
				<div className={styles.videoContent} ref={contentRef}>
					<CustomText $fontSize='17px' $color='#E30613' $margin='0 0 15px 0'>
						{formatDateTimeSimple(videoDetails?.date)}
					</CustomText>
					<h2>{videoDetails?.title}</h2>
					<div className={styles.mainVideo}>
						<iframe
							src={videoDetails.url ?? ''}
							allow='encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
							allowFullScreen
						></iframe>
					</div>
					<div className={styles.descVideo}>
						<p className={styles.descVideoText}>{videoDetails?.short}</p>
					</div>
					<MainButton as='route' to={`/${AppRoute.Videos}`} className={styles.allVideosBtn}>
						Все видеозаписи
					</MainButton>
				</div>
				<AsideVideos
					videosList={videosList}
					title='Похожие видео'
					orient={isSmallScreen ? 'horizontal' : 'vertical'}
					currentVideoId={id}
					previewCount={previewCount}
				/>
			</div>
		</>
	)
}
