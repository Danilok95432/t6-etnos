import React, { type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetEventProgramByIdQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { Program } from 'src/modules/program/program'

export const EventProgram: FC = () => {
	const { id = '' } = useParams()
	const { data: programDays } = useGetEventProgramByIdQuery(id)

	// const navDaysArr: TabNavigationItem[] =
	// 	eventDetails?.program?.map((dayEl) => ({
	// 		title: mainFormatDate(dayEl.date, 'dd MMMM') ?? '',
	// 		link: dayEl.id,
	// 	})) ?? []

	return (
		<div className={styles.programTab}>
			<h4>Программа</h4>
			<Program programDays={programDays ?? []} />
		</div>
	)
}
