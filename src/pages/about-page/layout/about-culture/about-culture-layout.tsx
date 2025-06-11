import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'

export const AboutCultureLayout = () => {
	return (
		<div className={styles.aboutCulturePage}>
			<Helmet>
				<title>Традиции Атманова угла</title>
			</Helmet>
			<Outlet />
		</div>
	)
}
