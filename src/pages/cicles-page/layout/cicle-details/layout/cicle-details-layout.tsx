import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { CicleInfoNavItems } from './consts'
import { CicleHeadInfo } from '../components/cicle-head-info/cicle-head-info'

export const CicleDetailsLayout: FC = () => {
	// const { id } = useParams()

	// const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
	return (
		<div className={styles.cicleDetailsWrapper}>
			<PageContent
				className={styles.cicleDetailsContent}
				$padding='42px 35px 35px 50px'
				$minHeight='auto'
			>
				<Helmet>
					<title>Информация о цикле</title>
				</Helmet>
				<Container>
					<CicleHeadInfo />
					<TabNav className={styles.cicleTabs} navItems={CicleInfoNavItems} />
					<Outlet />
				</Container>
			</PageContent>
		</div>
	)
}
