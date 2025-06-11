import { type FC, useState } from 'react'
import { type ProgramDay } from 'src/types/program'

import { ProgramNav } from 'src/modules/program/components/program-nav/program-nav'
import { ProgramList } from 'src/modules/program/components/program-list/program-list'

type EventProgramProps = {
	programDays: ProgramDay[] | []
}

export const Program: FC<EventProgramProps> = ({ programDays }) => {
	const [activeDayId, setActiveDayId] = useState(0)

	const navDays = programDays.map((day) => ({ id: day.id, date: day.date }))

	const handleChangeActiveDay = (id: number) => {
		setActiveDayId(id)
	}
	const getActiveProgram = () => {
		const currentDay = programDays.find((day) => day.id === activeDayId)
		return currentDay?.programList ?? []
	}

	if (!programDays?.length) return <h4>нет программы</h4>

	return (
		<div>
			<ProgramNav
				days={navDays}
				activeDayId={activeDayId}
				onChangeActiveDay={handleChangeActiveDay}
			/>
			<ProgramList list={getActiveProgram()} />
		</div>
	)
}
