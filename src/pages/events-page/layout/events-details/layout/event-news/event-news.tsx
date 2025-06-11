import React, { type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { NewsCard } from 'src/components/news-card/news-card'
import { useGetEventNewsByIdQuery } from 'src/store/events/events.api'
import { useParams } from 'react-router-dom'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const EventNews: FC = () => {
	const { id } = useParams()
	const { data: eventNews } = useGetEventNewsByIdQuery(id ?? '')
	const breakpoint = useBreakPoint()
	return (
		<>
			<h4>Новости события</h4>
			<GridRow
				$template={
					breakpoint === 'S'
						? 'auto / repeat(auto-fit, minmax(300px, 300px))'
						: 'auto / repeat(auto-fit, minmax(245px, 245px))'
				}
				$gap='20px'
				$margin='0 0 30px 0'
			>
				{eventNews?.map((newsEl) => <NewsCard key={newsEl.id} {...newsEl} />)}
			</GridRow>
		</>
	)
}
