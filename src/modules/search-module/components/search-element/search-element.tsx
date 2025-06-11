import { type FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

type SearchElementProps = {
	title: string
	link: string
	desc?: string
}

export const SearchElement: FC<SearchElementProps> = ({ title, link, desc }) => {
	return (
		<div className={styles.searchElement}>
			<Link to={link}>{title}</Link>
			{desc && <p>{desc}</p>}
		</div>
	)
}
