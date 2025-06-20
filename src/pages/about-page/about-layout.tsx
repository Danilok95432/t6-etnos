import { type FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import cn from 'classnames'

import { Container } from 'src/UI/Container/Container'
import { BreadCrumbs } from 'src/modules/bread-crumbs/bread-crumbs'
import { HeadMenu } from 'src/components/head-menu/head-menu'
import { PageContent } from 'src/components/page-content/page-content'

import { AboutMenuItems } from './consts'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { AboutLayoutHeader } from './components/about-layout-header'

export const AboutLayout: FC = () => {
	const location = useLocation()
	const breakpoint = useBreakPoint()

	const getCurrentLocation = () => {
		if (
			location.pathname.startsWith(`/about/about-etnosport/`) ||
			location.pathname.startsWith(`/about/about-games/`)
		) {
			return true
		}
		return false
	}

	const isTraditionPage = getCurrentLocation()
	return (
		<div className={styles.aboutLayout}>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...AboutMenuItems,
						{
							title: 'Об этноспорте',
							link: 'about',
						},
					]}
				/>
			</Container>
			<PageContent className={styles.aboutContentWrapper}>
				<Container className={styles.aboutContainerLayout}>
					{!isTraditionPage && (
						<>
							{breakpoint !== 'S' && <AboutLayoutHeader />}
							<HeadMenu
								className={styles.aboutSideMenu}
								sideItems={[
									{
										title: 'Об этноспорте',
										link: '/about',
									},
									...AboutMenuItems,
								]}
							/>
						</>
					)}
					<Outlet />
					{!isTraditionPage && breakpoint === 'S' && (
						<>
							<HeadMenu
								className={cn(styles.bottomMobileMenu, styles.aboutSideMenu)}
								position='bottom'
								sideItems={[
									{
										title: 'Об этноспорте',
										link: '/about',
									},
									...AboutMenuItems,
								]}
							/>
						</>
					)}
				</Container>
			</PageContent>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...AboutMenuItems,
						{
							title: 'Об этноспорте',
							link: 'about',
						},
					]}
				/>
			</Container>
		</div>
	)
}
