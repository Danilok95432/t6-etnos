import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { useActions } from 'src/hooks/actions/actions'
import { useGetTraditionByIdQuery } from 'src/store/cultures/cultures.api'

export const EtnosportInfo = () => {
	const { id = '' } = useParams()
	const { data: etnoData } = useGetTraditionByIdQuery(id ?? '')
	const { openModal } = useActions()

	const breakPoint = useBreakPoint()

	useAdditionalCrumbs(etnoData?.title)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (etnoData) {
			const images: ImageItemWithText[] = []
			if (etnoData.mainphoto) {
				images.push(etnoData.mainphoto[0])
			}
			if (etnoData.photos && Array.isArray(etnoData.photos)) {
				images.push(...etnoData.photos)
			}
			setAllPagePhoto(images)
		}
	}, [etnoData])

	return (
		<div className={styles.etnoInfoWrapper}>
			<div className={styles.mainInfo}>
				<div className={styles.infoBlock}>
					<h4 className={styles.title}>{etnoData?.title}</h4>
					<FlexRow className={styles.topLineEtno}>
            <span className={styles.etnoType}>{'Одиночный вид'}</span>
            <div className={styles.dot}></div>
            <span className={styles.etnoParticipants}>{`Всего участников: ${892}`}</span>
          </FlexRow>
          <div className={styles.descsWrapper}>
            <p>{etnoData?.topDesc}</p>
            <p>{etnoData?.bottomDesc}</p>
          </div>
        </div>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
