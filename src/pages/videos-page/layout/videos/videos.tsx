import React, { type FC, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getYear } from 'date-fns'
import { useGetVideosFiltrationQuery, useGetVideosMonthsQuery } from 'src/store/videos/videos.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import { MonthsFilterSlider } from 'src/components/months-filter-slider/months-filter-slider'
import { CategoriesFiltration } from 'src/components/categories-filtration/categories-filtration'
import { VideoCard } from 'src/components/video-card/video-card'
import { MobileList } from 'src/components/mobile-list/mobile-list'

import styles from './index.module.scss'

export const Videos: FC = () => {
	const [activeMonth, setActiveMonth] = useState('0')
	const [activeCategory, setActiveCategory] = useState('0')

	const { data: videosFiltrationInfo } = useGetVideosFiltrationQuery(null)
	const { data: videosList } = useGetVideosMonthsQuery({
		date: activeMonth,
		category: activeCategory,
	})

	const breakpoint = useBreakPoint()

	const handleChangeActiveMonth = (newMonth: string) => {
		setActiveMonth(newMonth)
	}
	const handleChangeActiveCategory = (newCategory: string) => {
		setActiveCategory(newCategory)
	}
	return (
		<>
			<Helmet>
				<title>Видеолента</title>
			</Helmet>
			<div className={styles.videosPage}>
				<h2>Видеолента {activeMonth !== '0' && getYear(new Date(activeMonth))}</h2>

				<MonthsFilterSlider
					monthsList={videosFiltrationInfo?.months ?? []}
					changeActiveMonth={handleChangeActiveMonth}
					activeMonth={activeMonth}
					allMonthTitle='Все видео'
				/>
				<CategoriesFiltration
					activeCatId={activeCategory}
					changeActiveCatId={handleChangeActiveCategory}
					categories={videosFiltrationInfo?.categories ?? []}
				/>
				{videosList?.length ? (
					breakpoint === 'S' ? (
						<MobileList
							items={videosList}
							renderItem={VideoCard}
							classListItems={styles.videosList}
						/>
					) : (
						<div className={styles.videosList}>
							{videosList.map((videosEl) => (
								<VideoCard key={videosEl.id} {...videosEl} />
							))}
						</div>
					)
				) : (
					<p className={styles.videosAbsence}>
						В выбранном вами месяце нет ни одного видео. Пожалуйста, выберите другой месяц.
					</p>
				)}
			</div>
		</>
	)
}
