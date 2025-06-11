import React, { useState } from 'react'
import { getYear } from 'date-fns'

import { MonthsFilterSlider } from 'src/components/months-filter-slider/months-filter-slider'
import { CategoriesFiltration } from 'src/components/categories-filtration/categories-filtration'
import { EventCard } from 'src/components/event-card/event-card'
import { useGetEventsFiltrationQuery, useGetEventsMonthsQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const FilteredEventsList = () => {
	const [activeMonth, setActiveMonth] = useState('0')
	const [activeCategory, setActiveCategory] = useState('0')
	const { data: eventsFiltrationInfo } = useGetEventsFiltrationQuery(null)
	const { data: eventsList } = useGetEventsMonthsQuery({
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
		<div className={styles.filteredListWrapper}>
			<h4>Cобытия {activeMonth !== '0' && getYear(new Date(activeMonth))}</h4>
			<MonthsFilterSlider
				monthsList={eventsFiltrationInfo?.months ?? []}
				changeActiveMonth={handleChangeActiveMonth}
				activeMonth={activeMonth}
				allMonthTitle='Все события'
			/>
			<CategoriesFiltration
				activeCatId={activeCategory}
				changeActiveCatId={handleChangeActiveCategory}
				categories={eventsFiltrationInfo?.brands ?? []}
			/>
			{breakpoint === 'S' && eventsList ? (
				<MobileList items={eventsList} renderItem={EventCard} classListItems={styles.eventsList} />
			) : (
				<div className={styles.eventsList}>
					{eventsList?.map((eventEl) => (
						<EventCard key={eventEl.id} {...eventEl} className={styles.eventCard} />
					))}
				</div>
			)}
		</div>
	)
}
