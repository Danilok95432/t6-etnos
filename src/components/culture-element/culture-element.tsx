import { type FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

type CultureElementProps = {
	id: string
	title: string
	desc: string
}

export const CultureElement: FC<CultureElementProps> = ({ id, title, desc }) => {
	return (
		<Link to={id}>
			<div className={styles.cultureElem}>
				<h5>{title}</h5>
				<p>{desc}</p>
			</div>
		</Link>
	)
}
