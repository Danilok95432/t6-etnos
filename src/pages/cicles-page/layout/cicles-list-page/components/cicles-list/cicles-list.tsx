import { EventCard } from 'src/components/event-card/event-card'

import styles from './index.module.scss'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { CicleCard } from 'src/components/cicle-card/cicle-card'
import skeleton from 'src/assets/img/skeleton-img.png'
import { useGetAllCiclesQuery } from 'src/store/cicles/cicles.api'

export const CiclesList = () => {
	const { data: ciclesList } = useGetAllCiclesQuery(null)
	const breakpoint = useBreakPoint()

	return (
		<div className={styles.filteredListWrapper}>
			<h4>Циклы событий</h4>
      <p>В этом разделе представлены крупные события. В их состав обычно входят регулярные мероприятия, например — ежегодный фестиваль или цикл мастер-классов.</p>
			{breakpoint === 'S' && ciclesList ? (
				<MobileList items={ciclesList?.cicles} renderItem={CicleCard} classListItems={styles.ciclesList} />
			) : (
				<div className={styles.ciclesList}>
					{ciclesList?.cicles?.map((cicleEl) => (
						<CicleCard key={cicleEl.id} {...cicleEl} className={styles.cicleCard} />
					))}
				</div>
			)}
		</div>
	)
}
