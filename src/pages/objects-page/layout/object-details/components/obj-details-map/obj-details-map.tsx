import React, { type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'

import styles from './index.module.scss'
import { ContactsMap } from 'src/components/contacts-map/contacts-map'
// import { ObjPlacement } from 'src/modules/objPlacement/obj-placement'

export const ObjDetailsMap: FC = () => {
	const { id } = useParams()

	const { data: objectData } = useGetObjectByIdQuery(id ?? '')

	function parseCoordinates(coordinateString: string): [number, number] | undefined {
		if (!coordinateString) {
			return undefined
		}
		const coordinatesArray = coordinateString.split(',').map((coord) => parseFloat(coord.trim()))
		if (coordinatesArray.length === 2 && !coordinatesArray.some(isNaN)) {
			return [coordinatesArray[0], coordinatesArray[1]]
		}
		return undefined
	}
	const coordinates = parseCoordinates(objectData?.coords ?? '')

	if (!objectData?.location) return null
	if (!objectData?.coords) return null

	return (
		<section className={styles.mapSection}>
			<h2>Адрес</h2>
			{/* <div className={styles.objLocation}>
				{objectData?.paths.length > 0 ? (
					<ObjPlacement placeVariants={objectData?.paths} title='Как добраться' />
				) : (
					<iframe src={objectData?.location} width='100%' height='100%' loading='eager'></iframe>
				)}
			</div> */}
			<div className={styles.objLocation}>
				<ContactsMap className={styles.aboutMap} points={coordinates} zoom={17} />
			</div>
		</section>
	)
}
