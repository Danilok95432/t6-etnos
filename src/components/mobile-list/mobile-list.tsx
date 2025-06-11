import React, { useState } from 'react'

import { MainButton } from 'src/UI/MainButton/MainButton'
import styles from './index.module.scss'

type MobileListProps<T> = {
	items: T[]
	defaultVisibleCount?: number
	renderItem: React.ComponentType<T>
	classListItems: string
}

export const MobileList = <T extends { id: string }>({
	items,
	defaultVisibleCount = 2,
	renderItem: RenderItem,
	classListItems,
}: MobileListProps<T>) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleList = () => {
		setIsExpanded(!isExpanded)
	}

	const visibleItems = isExpanded ? items : items?.slice(0, defaultVisibleCount)

	return (
		<>
			<div className={classListItems}>
				{visibleItems?.map((item) => <RenderItem key={item.id} {...item} />)}
			</div>
			{items?.length > defaultVisibleCount && (
				<MainButton $variant='show' className={styles.showMoreBtn} onClick={toggleList}>
					{isExpanded ? 'Скрыть' : 'Показать ещё'}
				</MainButton>
			)}
		</>
	)
}
