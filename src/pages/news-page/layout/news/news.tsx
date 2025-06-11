import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getYear } from 'date-fns'
import { useGetNewsFiltrationQuery, useGetNewsMonthsQuery } from 'src/store/news/news.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import { MonthsFilterSlider } from 'src/components/months-filter-slider/months-filter-slider'
import { CategoriesFiltration } from 'src/components/categories-filtration/categories-filtration'
import { NewsCard } from 'src/components/news-card/news-card'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { Container } from 'src/UI/Container/Container'
import { PageContent } from 'src/components/page-content/page-content'

import styles from './index.module.scss'

export const News = () => {
	const [activeMonth, setActiveMonth] = useState('0')
	const [activeCategory, setActiveCategory] = useState('0')

	const { data: newsFiltrationInfo } = useGetNewsFiltrationQuery(null)
	const { data: newsList } = useGetNewsMonthsQuery({
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
				<title>Новости</title>
			</Helmet>
			<PageContent className={styles.newsListPage}>
				<Container className={styles.newsContainer}>
					<h2>Новости {activeMonth !== '0' && getYear(new Date(activeMonth))}</h2>

					<MonthsFilterSlider
						monthsList={newsFiltrationInfo?.months ?? []}
						changeActiveMonth={handleChangeActiveMonth}
						activeMonth={activeMonth}
						allMonthTitle='Все новости'
					/>
					<CategoriesFiltration
						activeCatId={activeCategory}
						changeActiveCatId={handleChangeActiveCategory}
						categories={newsFiltrationInfo?.categories ?? []}
					/>
					{newsList?.length ? (
						breakpoint === 'S' ? (
							<MobileList items={newsList} renderItem={NewsCard} classListItems={styles.newsList} />
						) : (
							<div className={styles.newsList}>
								{newsList.map((newsEl) => (
									<NewsCard key={newsEl.id} {...newsEl} />
								))}
							</div>
						)
					) : (
						<p className={styles.newsAbsence}>
							В выбранном вами месяце нет ни одной новости. Пожалуйста, выберите другой месяц.
						</p>
					)}
				</Container>
			</PageContent>
		</>
	)
}
