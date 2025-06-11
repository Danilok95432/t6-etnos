import { type FC, useState } from 'react'
import { type ObjectMapPaths } from 'src/types/objects'
import { RenderedArray } from 'src/components/rendered-array/rendered-array'

import styles from './index.module.scss'
import cn from 'classnames'

type PlacementProps = {
	title?: string
	placeVariants: ObjectMapPaths[] | undefined
}

export const ObjPlacement: FC<PlacementProps> = ({ title, placeVariants }) => {
	if (!placeVariants?.length) return
	const [activePlace, setActivePlace] = useState({
		placeSrc: placeVariants[0].path_yandex ?? '',
		placeIdx: 0,
	})

	const handleChangePlace = (location: string, idx: number) => {
		setActivePlace({
			placeSrc: location,
			placeIdx: idx,
		})
	}

	return (
		<div className={styles.placementWrapper}>
			{title && <h4>{title}</h4>}
			<ul className={styles.placeTabs}>
				{placeVariants?.map((place, idx) => (
					<li
						className={cn({ active: idx === activePlace.placeIdx })}
						key={idx}
						onClick={() => handleChangePlace(place.path_yandex, idx)}
					>
						<h6>{place.path_name}</h6>
						{Array.isArray(place.path_desc) ? (
							<RenderedArray
								className={styles.placeListDesc}
								strArray={place.path_desc}
								asStr='p'
								as='div'
							/>
						) : (
							<p>{place.path_desc}</p>
						)}
					</li>
				))}
			</ul>
			<div className={styles.placeMap}>
				<iframe src={activePlace.placeSrc} width='100%' height='245' loading='eager'></iframe>
			</div>
		</div>
	)
}
