import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
import { EtnosportInfo } from './components/etnosport-info/etnosport-info'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { EtnosportInfoNavItems } from './consts'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'

export const EtnosportDetailsLayout: FC = () => {
	// const { id } = useParams()

	// const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
	return (
		<div className={styles.etnosportDetailsWrapper}>
      <Helmet>
        <title>Информация об этноспорте</title>
      </Helmet>
      <EtnosportInfo />
      <TabNav className={styles.etnosportTabs} navItems={EtnosportInfoNavItems} />
      <Outlet />
		</div>
	)
}
