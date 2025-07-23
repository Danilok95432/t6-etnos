import { useEffect, useState, type FC } from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
import { EventInfoNavItems } from 'src/pages/events-page/layout/events-details/layout/consts'
import { EventInfo } from 'src/pages/events-page/layout/events-details/components/event-info/event-info'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const EventDetailsLayout: FC = () => {
	const location = useLocation()
	const [isProgramPage, setIsProgramPage] = useState<boolean>(false)

	useEffect(() => {
		setIsProgramPage(location.pathname.includes('/event-program') || location.pathname.includes('/rules') || location.pathname.includes('/docs'))
	}, [location.pathname])

	return (
		<div className={styles.eventDetailsWrapper}>
			<PageContent
				className={styles.eventDetailsContent}
				$padding='42px 35px 35px 50px'
				$minHeight='auto'
			>
				<Helmet>
					<title>Информация о событии</title>
				</Helmet>
				<Container>
					{!isProgramPage && <EventInfo />}
					{!isProgramPage && <TabNav className={styles.eventTabs} navItems={EventInfoNavItems} />}
					<Outlet />
				</Container>
			</PageContent>
		</div>
	)
}
