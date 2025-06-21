import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { useActions } from 'src/hooks/actions/actions'
import { useGetGameByIdQuery } from 'src/store/games/games.api'

export const FunInfo = () => {
	const { id = '' } = useParams()
		const { data: funData } = useGetGameByIdQuery(id ?? '')
	const { openModal } = useActions()

	const breakPoint = useBreakPoint()

	useAdditionalCrumbs(funData?.title)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (funData) {
			const images: ImageItemWithText[] = []
			if (funData.mainphoto) {
				images.push(funData.mainphoto[0])
			}
			if (funData.photos && Array.isArray(funData.photos)) {
				images.push(...funData.photos)
			}
			setAllPagePhoto(images)
		}
	}, [funData])

	return (
		<div className={styles.funInfoWrapper}>
			<div className={styles.mainInfo}>
				<div className={styles.infoBlock}>
					<h4 className={styles.title}>{funData?.title}</h4>
					<FlexRow className={styles.topLineFun}>
            <span className={styles.funType}>{'Одиночный вид'}</span>
            <div className={styles.dot}></div>
            <span className={styles.funParticipants}>{`Всего участников: ${892}`}</span>
          </FlexRow>
          <div className={styles.descsWrapper}>
          	<p>{funData?.topDesc}</p>
            <p>{funData?.bottomDesc}</p>
					</div>
        </div>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
