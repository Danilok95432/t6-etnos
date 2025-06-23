import { type FC } from 'react'

import { Outlet, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
import { EtnosportInfo } from './components/etnosport-info/etnosport-info'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { EtnosportDifInfoNavItems, EtnosportInfoNavItems } from './consts'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const EtnosportDetailsLayout: FC = () => {
	const { id = '' } = useParams()
  const { data: etnoData } = useGetVidInfoByIdQuery(id ?? '')

	return (
		<div className={styles.etnosportDetailsWrapper}>
      <Helmet>
        <title>Информация об этноспорте</title>
      </Helmet>
      <EtnosportInfo />
      {
        etnoData?.vids.is_single ?
        <TabNav className={styles.etnosportTabs} navItems={EtnosportInfoNavItems} />
        :
        <TabNav className={styles.etnosportTabs} navItems={EtnosportDifInfoNavItems} />
      }
      <Outlet />
		</div>
	)
}
