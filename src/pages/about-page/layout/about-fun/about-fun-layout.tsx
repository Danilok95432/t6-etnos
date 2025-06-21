import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'

export const AboutFunLayout = () => {
	return (
		<div className={styles.aboutFunPage}>
			<Helmet>
				<title>Исконные забавы</title>
			</Helmet>
			<Outlet />
		</div>
	)
}
