import { type FC } from 'react'
import { type ProgramListItem } from 'src/types/program'

import skeleton from 'src/assets/img/skeleton-img.png'
import styles from './index.module.scss'
import { MainButton } from 'src/UI/MainButton/MainButton'

type ProgramListProps = {
	list: ProgramListItem[]
	viewMode: string
}

export const ProgramList: FC<ProgramListProps> = ({ list, viewMode = 'list' }) => {
	if (!list?.length) return null
	return (
		<>
			{
				viewMode === 'list' ?
				<ul className={styles.listProgram}>
					{list.map((programEL) => (
						<li key={programEL.id}>
							<p className={styles.programTime}>{programEL.time}</p>
							<span className={styles.programPlace}>{programEL.place}</span>
							<span className={styles.programTitle}>{programEL.title}</span>
						</li>
					))}
				</ul>
				:
				<div className={styles.listTabs}>
					{
						list.map((programEL) => (
							<figure key={programEL.id} className={styles.listTabCard}>
								<div className={styles.imgWrapper}>
									<img src={skeleton} alt="" />
								</div>
								<figcaption>
									<h3 className={styles.programTitle}>{programEL.title}</h3>
									<p className={styles.programTime}>{programEL.time}</p>
									<p className={styles.programPlace}>{programEL.place}</p>
									<MainButton as='route' to={'#'} className={styles.requestBtn}>
										Подать заявку
									</MainButton>
								</figcaption>
							</figure>
						))
					}
				</div>
			}
		</>
	)
}
