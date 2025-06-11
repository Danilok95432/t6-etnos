import React, { type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'
import { RenderedArray } from 'src/components/rendered-array/rendered-array'

import styles from './index.module.scss'

export const ObjDetailsDescs: FC = () => {
	const { id } = useParams()

	const { data: objectData } = useGetObjectByIdQuery(id ?? '')

	if (!objectData?.descList?.length) return null

	return (
		<section className={styles.objDescSection}>
			<RenderedArray className={styles.descs} strArray={objectData?.descList} asStr='p' as='div' />
		</section>
	)
}
