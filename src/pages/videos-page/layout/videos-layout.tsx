import React, { type FC } from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
import { BreadCrumbs } from 'src/modules/bread-crumbs/bread-crumbs'
import { PageContent } from 'src/components/page-content/page-content'

import styles from './index.module.scss'

export const VideosLayout: FC = () => {
	return (
		<>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Видеолента',
							link: 'videos',
						},
					]}
				/>
			</Container>
			<PageContent className={styles.videosPageContent}>
				<Container className={styles.videosContainer}>
					<Outlet />
				</Container>
			</PageContent>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Видеолента',
							link: 'videos',
						},
					]}
				/>
			</Container>
		</>
	)
}
