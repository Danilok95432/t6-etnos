import React, { type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetEventByIdQuery } from 'src/store/events/events.api'

import styles from './index.module.scss'
import { Placement } from 'src/modules/placement/placement'

export const EventMaps: FC = () => {
	const { id = '' } = useParams()
	const { data: eventInfo } = useGetEventByIdQuery(id ?? '')

	return (
		<div className={styles.mapTab}>
			<h2>Карты и маршруты</h2>
			<section className={styles.mapSection}>
        <Placement placeVariants={eventInfo?.pathways} title='Как добраться' />
      </section>
      <section>
        <Placement placeVariants={eventInfo?.placement} title='Размещение' />
      </section>
		</div>
	)
}
