import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'

export const AboutEtnosportLayout = () => {
	return (
		<div className={styles.aboutEtnosportPage}>
			<Helmet>
				<title>Этноспорт</title>
			</Helmet>
			<Outlet />
		</div>
	)
}
