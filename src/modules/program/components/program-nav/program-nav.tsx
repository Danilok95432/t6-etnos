import { type FC } from 'react'
import { mainFormatDate } from 'src/helpers/utils'

import styles from './index.module.scss'
import cn from 'classnames'

type DayNav = {
	id: number
	date: Date
}

type ProgramNavProps = {
	days: DayNav[]
	activeDayId: number
	onChangeActiveDay: (id: number) => void
}

export const ProgramNav: FC<ProgramNavProps> = ({ days, activeDayId, onChangeActiveDay }) => {
	return (
		<ul className={styles.programNav}>
			{days.map((el) => (
				<li
					className={cn({ [styles._active]: activeDayId === el.id })}
					key={el.id}
					onClick={() => onChangeActiveDay(el.id)}
				>
					{mainFormatDate(el.date, 'dd MMMM')}
				</li>
			))}
		</ul>
	)
}
