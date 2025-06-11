import React, { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { FilteredEventsList } from 'src/pages/events-page/layout/events-list-page/components/filtered-events-list/filtered-events-list'
import { EventPoster } from 'src/pages/events-page/layout/events-list-page/components/event-poster/event-poster'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { useGetEventsMonthsQuery } from 'src/store/events/events.api'

export const EventsListPage: FC = () => {
	const { data: eventsList } = useGetEventsMonthsQuery({
		date: '0',
		category: '0',
	})
	const [mainEvent, setMainEvent] = useState('')
	useEffect(() => {
		if (eventsList && eventsList?.length > 0) {
			const currentEvent = eventsList?.find((item) => item.status === 'current')
			if (currentEvent) setMainEvent(currentEvent.id)
			else {
				const futureEvent = eventsList?.find((item) => item.status === 'future')
				if (futureEvent) setMainEvent(futureEvent.id)
			}
		}
	}, [eventsList])

	return (
		<PageContent
			className={styles.eventsPageContent}
			$padding='0 0 70px 0'
			$borderRadius='25px 25px 0 0'
		>
			<Helmet>
				<title>Cобытия</title>
			</Helmet>
			<Container>
				{mainEvent !== '' && <EventPoster posterEventId={mainEvent} />}
				<FilteredEventsList />
			</Container>
		</PageContent>
	)
}
