import React, { useRef, useState } from 'react'

import { useCollapsibleText } from './useCollapsibleText'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import { MainButton } from 'src/UI/MainButton/MainButton'
import { CollapseContainer } from './components/collapse-text-container'

import styles from './index.module.scss'

type CollapsibleTextProps = {
	item: React.ReactNode
	lineClamp: number
	collapsePoint?: string
}

export const CollapsibleText: React.FC<CollapsibleTextProps> = ({
	item,
	lineClamp,
	collapsePoint,
}) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const textContainerRef = useRef<HTMLDivElement | null>(null)
	const breakpoint = useBreakPoint()

	const toggleList = () => {
		setIsExpanded(!isExpanded)
	}

	const isOverflowing = useCollapsibleText({ ref: textContainerRef, lineClamp })

	if (breakpoint !== collapsePoint) {
		return <>{item}</>
	}
	return (
		<>
			<CollapseContainer ref={textContainerRef} $lineClamp={lineClamp} $isExpanded={isExpanded}>
				{item}
			</CollapseContainer>
			{isOverflowing && (
				<MainButton $variant='show' className={styles.showMoreBtn} onClick={toggleList}>
					{isExpanded ? 'Скрыть' : 'Показать ещё'}
				</MainButton>
			)}
		</>
	)
}
