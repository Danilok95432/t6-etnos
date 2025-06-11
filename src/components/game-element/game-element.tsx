import { type FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

type GameElementProps = {
	id: string
	title: string
	desc: string
}

export const GameElement: FC<GameElementProps> = ({ id, title, desc }) => {
	return (
		<Link to={id}>
			<div className={styles.gameElem}>
				<h5>{title}</h5>
				<p>{desc}</p>
			</div>
		</Link>
	)
}
