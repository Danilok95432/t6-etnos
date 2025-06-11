import { type FC } from 'react'

import { Link } from 'react-router-dom'

import { customFormatDate } from 'src/helpers/utils'

import styles from './index.module.scss'

type DatedItemProps = {
	id: string
	date: string | [string, string]
	prevDate: string
	previewImage: string
	title: string
	desc: string
}
export const DatedItem: FC<DatedItemProps> = ({
	id,
	date,
	prevDate,
	previewImage,
	title,
	desc,
}) => {
	const currentDate = Array.isArray(date) ? new Date(date[0]) : new Date(date)

	const currentMonth = currentDate.getMonth()
	const prevMonth = new Date(prevDate).getMonth()
	const currentYear = currentDate.getFullYear()

	const renderDateInfo = () => {
		if (Array.isArray(date)) {
			return (
				<>
					{customFormatDate(date[0], { day: 'numeric', month: 'long' })} - <br />
					{customFormatDate(date[1], { day: 'numeric', month: 'long' })}{' '}
					{new Date(date[1]).getFullYear()}
				</>
			)
		}
		return <>{customFormatDate(date, { day: 'numeric', month: 'long' })}</>
	}

	return (
		<>
			{currentMonth !== prevMonth && (
				<li className={styles.titleMonth}>
					<span>{customFormatDate(currentDate, { month: 'long' })},</span> {currentYear}
				</li>
			)}
			<li className={styles.datedItem} key={id}>
				<Link className={styles.datedItemInner} to={id}>
					<span className={styles.dateInfo}>{renderDateInfo()}</span>
					<div className={styles.datedItemContent}>
						<h5>{title}</h5>
						<p>{desc}</p>
					</div>
					<div className={styles.datedItemImg}>
						<img src={previewImage} alt={title} />
					</div>
				</Link>
			</li>
		</>
	)
}
