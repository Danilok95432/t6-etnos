import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { TabNav } from 'src/components/tab-nav/tab-nav'
// import { useGetEventByIdQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { HeroesInfoNavItems } from './consts'
import { HeroInfo } from '../components/hero-info/hero-info'
import { BreadCrumbs } from 'src/modules/bread-crumbs/bread-crumbs'

export const HeroesDetailsLayout: FC = () => {
	// const { id } = useParams()

	// const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
	return (
    <>
    <Container>
      <BreadCrumbs
        crumbsLinksMap={[
          {
            title: 'Герои',
            link: 'heroes',
          },
        ]}
      />
    </Container>
		<div className={styles.heroDetailsWrapper}>
			<PageContent
				className={styles.heroDetailsContent}
				$padding='42px 35px 35px 50px'
				$minHeight='auto'
			>
				<Helmet>
					<title>Информация о героях</title>
				</Helmet>
				<Container>
					<HeroInfo />
					<TabNav className={styles.heroTabs} navItems={HeroesInfoNavItems} />
					<Outlet />
				</Container>
			</PageContent>
		</div>
    <Container>
      <BreadCrumbs
        crumbsLinksMap={[
          {
            title: 'Герои',
            link: 'heroes',
          },
        ]}
      />
    </Container>
    </>
	)
}
