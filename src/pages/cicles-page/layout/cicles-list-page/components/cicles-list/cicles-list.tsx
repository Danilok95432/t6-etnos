import { EventCard } from 'src/components/event-card/event-card'

import styles from './index.module.scss'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { CicleCard } from 'src/components/cicle-card/cicle-card'
import skeleton from 'src/assets/img/skeleton-img.png'

export const CiclesList = () => {
	const ciclesList = [
    {
      id: '1',
      title: 'Атмановские кулачки',
      photo: [{id: '', title: '', original: skeleton, author: '', thumbnail: ''}],
      type: 'Фестиваль',
      since: 'Цикл проводится с 1648 года',
      countEvents: '5',
      desc: 'Турнир в формате 5х5 пройдёт в рамках большого спортивного фестиваля "День московского спорта" и имеет важное значение, так как участники этого турнира получат путёвку на Богатырскую сечу.!'
    },
    {
      id: '2',
      title: 'Русские игры в Лужниках',
      photo: [{id: '', title: '', original: skeleton, author: '', thumbnail: ''}],
      type: 'Соревнования этноспорта',
      since: 'Цикл проводится с 1648 года',
      countEvents: '5',
      desc: 'Турнир в формате 5х5 пройдёт в рамках большого спортивного фестиваля "День московского спорта" и имеет важное значение, так как участники этого турнира получат путёвку на Богатырскую сечу.!'
    },
    {
      id: '3',
      title: 'Большие игры в Санкт-Петербурге',
      photo: [{id: '', title: '', original: skeleton, author: '', thumbnail: ''}],
      type: 'Фестиваль',
      since: 'Цикл проводится с 1648 года',
      countEvents: '5',
      desc: 'Турнир в формате 5х5 пройдёт в рамках большого спортивного фестиваля "День московского спорта" и имеет важное значение, так как участники этого турнира получат путёвку на Богатырскую сечу.!'
    },
    {
      id: '4',
      title: 'Большой традиционный всероссийский хоровод',
      photo: [{id: '', title: '', original: skeleton, author: '', thumbnail: ''}],
      type: 'Мастер-классы',
      since: 'Цикл проводится с 1648 года',
      countEvents: '5',
      desc: 'Турнир в формате 5х5 пройдёт в рамках большого спортивного фестиваля "День московского спорта" и имеет важное значение, так как участники этого турнира получат путёвку на Богатырскую сечу.!'
    }
  ]
	const breakpoint = useBreakPoint()

	return (
		<div className={styles.filteredListWrapper}>
			<h4>Циклы событий</h4>
      <p>В этом разделе представлены крупные события. В их состав обычно входят регулярные мероприятия, например — ежегодный фестиваль или цикл мастер-классов.</p>
			{breakpoint === 'S' && ciclesList ? (
				<MobileList items={ciclesList} renderItem={CicleCard} classListItems={styles.ciclesList} />
			) : (
				<div className={styles.ciclesList}>
					{ciclesList?.map((cicleEl) => (
						<CicleCard key={cicleEl.id} {...cicleEl} className={styles.cicleCard} />
					))}
				</div>
			)}
		</div>
	)
}
