import { type FC } from 'react'

import { Outlet, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { FunDifInfoNavItems, FunInfoNavItems } from './consts'

import styles from './index.module.scss'
import { FunInfo } from './components/fun-info/fun-info'
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const FunDetailsLayout: FC = () => {
	const { id = '' } = useParams()
  const { data: etnoData } = useGetVidInfoByIdQuery(id ?? '')

	return (
		<div className={styles.funDetailsWrapper}>
      <Helmet>
        <title>Информация об исконной забаве</title>
      </Helmet>
      <FunInfo />
      {
        etnoData?.vids.is_single ?
        <TabNav className={styles.etnosportTabs} navItems={FunInfoNavItems} />
        :
        <TabNav className={styles.etnosportTabs} navItems={FunDifInfoNavItems} />
      }
      <Outlet />
		</div>
	)
}
