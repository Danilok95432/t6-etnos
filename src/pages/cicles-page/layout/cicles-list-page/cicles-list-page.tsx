import React, { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { CiclesList } from './components/cicles-list/cicles-list'

export const CiclesListPage: FC = () => {

	return (
		<PageContent
			className={styles.ciclesPageContent}
			$padding='0 0 70px 0'
			$borderRadius='25px 25px 0 0'
		>
			<Helmet>
				<title>Циклы событий</title>
			</Helmet>
			<Container>
				<CiclesList />
			</Container>
		</PageContent>
	)
}
