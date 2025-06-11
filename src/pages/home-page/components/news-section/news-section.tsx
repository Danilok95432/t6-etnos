import React, { type FC, type RefObject, useRef, useMemo } from 'react'
import cn from 'classnames'
import { type SwiperRef } from 'swiper/react/swiper-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container } from 'src/UI/Container/Container'
import { AppRoute } from 'src/routes/main-routes/consts'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useGetHomeNewsQuery } from 'src/store/home/home.api'
import { newsSliderOptions } from 'src/pages/home-page/components/news-section/newsSliderOptions'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { NewsCard } from 'src/components/news-card/news-card'
import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { type CardNewsItem } from 'src/types/news'

export const NewsSection: FC = () => {
	const { data: newsList } = useGetHomeNewsQuery(null)
	const breakpoint = useBreakPoint()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	const { mainNews, topNews } = useMemo(() => {
		if (!newsList) {
			return { mainNews: null, topNews: [] }
		}

		const sortedNews = [...newsList].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		)

		let mainNewsItem = sortedNews.find((news) => news.main) ?? null
		if (mainNewsItem) {
			const mainNewsList = sortedNews.filter((news) => news.main)
			mainNewsItem = mainNewsList[0]
		}

		let topNewsItems: CardNewsItem[] = []

		if (mainNewsItem) {
			const filtered = sortedNews.filter((news) => news.id !== mainNewsItem?.id)

			if (breakpoint === 'breakPoint') {
				topNewsItems = filtered.slice(0, 1)
			} else if (breakpoint === 'ShortLg' || breakpoint === 'L') {
				topNewsItems = []
			} else if (breakpoint === 'S') {
				mainNewsItem = null
				topNewsItems = []
			} else {
				topNewsItems = filtered.slice(0, 2)
			}
		} else {
			topNewsItems = sortedNews.slice(0, 5)
		}

		return { mainNews: mainNewsItem, topNews: topNewsItems }
	}, [newsList, breakpoint])

	const sliderNews = useMemo(() => {
		if (!newsList) return []

		const excludedNewsIds: string[] = []

		if (mainNews) {
			excludedNewsIds.push(mainNews.id)
		}
		excludedNewsIds.push(...topNews.map((news) => news.id))

		return newsList.filter((news) => !excludedNewsIds.includes(news.id))
	}, [newsList, mainNews, topNews])

	return (
		<section className={cn(styles.newsSection, '_bordered')}>
			<Container>
				<FlexRow className={styles.newsSectionRow}>
					<h2>Новости</h2>
					<MainButton as='route' to={AppRoute.News}>
						Все новости
					</MainButton>
				</FlexRow>
				{(breakpoint === 'L' || breakpoint === 'sliderBtnsPoint') && (
					<div className={styles.breakpointNews}>
						{mainNews ? (
							<>
								<div className={styles.mainNews}>
									<NewsCard {...mainNews} mainStatus={true} className={styles.mainNewsCard} />
								</div>
								<div className={styles.topNews}>
									{topNews.map((news) => (
										<NewsCard className={styles.defaultNewsCard} key={news.id} {...news} />
									))}
								</div>
							</>
						) : (
							<div className={styles.topNews}>
								{topNews.map((news) => (
									<NewsCard className={styles.defaultNewsCard} key={news.id} {...news} />
								))}
							</div>
						)}
					</div>
				)}
				{sliderNews?.length > 0 && (
					<div className='slider-with-btns'>
						<Swiper {...newsSliderOptions} ref={swiperRef}>
							{sliderNews.map((newsEl, idx) => (
								<SwiperSlide className={styles.newsSlide} key={idx}>
									<NewsCard key={newsEl.id} {...newsEl} />
								</SwiperSlide>
							))}
						</Swiper>
						<SliderBtns
							className={styles.newsSliderBtns}
							$topPosition='50%'
							$btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '97%'}
							swiperRef={swiperRef}
							color={'#5C5C5C'}
						/>
					</div>
				)}
			</Container>
		</section>
	)
}
