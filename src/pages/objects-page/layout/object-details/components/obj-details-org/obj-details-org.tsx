import React, { type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'

import styles from './index.module.scss'

export const ObjDetailsOrg: FC = () => {
	const { id } = useParams()

	const { data: objectData } = useGetObjectByIdQuery(id ?? '')

	if (!objectData?.org) return null

	return (
		<section className={styles.objOrgSection}>
			<h4>Организатор</h4>
			<div className={styles.objOrgItem}>
				<span>Название организации</span>
				<p>{objectData?.org.name}</p>
			</div>
			<div className={styles.objOrgItem}>
				<span>ОГРН</span>
				<p>{objectData?.org.ogrn}</p>
			</div>
			<div className={styles.objOrgItem}>
				<span>ИНН</span>
				<p>{objectData?.org.inn}</p>
			</div>
			<div className={styles.objOrgItem}>
				<span>Адрес</span>
				<p>{objectData?.org.adress}</p>
			</div>
			<div className={styles.objOrgItem}>
				<span>Телефон</span>
				<p>{objectData?.org.phone}</p>
			</div>
		</section>
	)
}
