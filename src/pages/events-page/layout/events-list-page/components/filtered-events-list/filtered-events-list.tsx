import React, { useState } from 'react'
import { getYear } from 'date-fns'

import { MonthsFilterSlider } from 'src/components/months-filter-slider/months-filter-slider'
import { EventCard } from 'src/components/event-card/event-card'
import { useGetEventsFiltrationQuery, useGetEventsMonthsQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const FilteredEventsList = () => {
	const [activeMonth, setActiveMonth] = useState('0')
	const { data: eventsFiltrationInfo } = useGetEventsFiltrationQuery(null)
	const { data: eventsList } = useGetEventsMonthsQuery({
		date: activeMonth,
		category: '',
	})
	const breakpoint = useBreakPoint()

	const handleChangeActiveMonth = (newMonth: string) => {
		setActiveMonth(newMonth)
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
