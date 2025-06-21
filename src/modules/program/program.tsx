import { type FC, useState } from 'react'
import { type ProgramDay } from 'src/types/program'
import cn from 'classnames'

import { ProgramNav } from 'src/modules/program/components/program-nav/program-nav'
import { ProgramList } from 'src/modules/program/components/program-list/program-list'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { ListPropgramSVG } from 'src/UI/icons/listProgramSVG'
import { TabProgramSVG } from 'src/UI/icons/tabProgramSVG'
import { SwitcherView } from 'src/components/switcherView/switcherView'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

type EventProgramProps = {
	programDays: ProgramDay[] | []
	parentView?: string
}

export const Program: FC<EventProgramProps> = ({ programDays, parentView = 'list' }) => {
	const [activeDayId, setActiveDayId] = useState(0)
	const [view, setView] = useState<string>(parentView)
	const breakPoint = useBreakPoint()

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
			<FlexRow className={styles.headProgram}>
				<ProgramNav
					days={navDays}
					activeDayId={activeDayId}
					onChangeActiveDay={handleChangeActiveDay}
				/>
				<SwitcherView view={view} switchView={setView} className={styles.hiddenMobile} />
			</FlexRow>
			<ProgramList list={getActiveProgram()} viewMode={breakPoint === 'S' ? parentView : view} />
		</div>
	)
}
