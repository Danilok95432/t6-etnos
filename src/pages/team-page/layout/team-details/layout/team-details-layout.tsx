import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
import { TeamInfoNavItems } from './consts'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { TeamInfo } from '../components/team-info/team-info'


export const TeamDetailsLayout: FC = () => {
	// const { id } = useParams()

	// const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
	return (
		<div className={styles.participantDetailsWrapper}>
			<PageContent
				className={styles.participantDetailsContent}
				$padding='42px 35px 35px 50px'
				$minHeight='auto'
			>
				<Helmet>
					<title>Информация о участнике</title>
				</Helmet>
				<Container>
					<TeamInfo />
					<TabNav className={styles.participantTabs} navItems={TeamInfoNavItems} />
					<Outlet />
				</Container>
			</PageContent>
		</div>
	)
}
