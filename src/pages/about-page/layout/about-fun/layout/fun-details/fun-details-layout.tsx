import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { FunInfoNavItems } from './consts'

import styles from './index.module.scss'
import { FunInfo } from './components/fun-info/fun-info'

export const FunDetailsLayout: FC = () => {
	// const { id } = useParams()

	// const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
	return (
		<div className={styles.funDetailsWrapper}>
      <Helmet>
        <title>Информация об исконной забаве</title>
      </Helmet>
      <FunInfo />
      <TabNav className={styles.funTabs} navItems={FunInfoNavItems} />
      <Outlet />
		</div>
	)
}
