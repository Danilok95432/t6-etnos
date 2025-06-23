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
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const FunInfo = () => {
	const { id = '' } = useParams()
	const { data: funData } = useGetVidInfoByIdQuery(id ?? '')
	const { openModal } = useActions()

	const breakPoint = useBreakPoint()

	useAdditionalCrumbs(funData?.vids.title)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (funData) {
			const images: ImageItemWithText[] = []
			if (funData?.vids.mainphoto) {
				images.push(funData?.vids.mainphoto[0])
			}
			if (funData?.vids.photos && Array.isArray(funData?.vids.photos)) {
				images.push(...funData?.vids.photos)
			}
			setAllPagePhoto(images)
		}
	}, [funData])

	return (
		<div className={styles.funInfoWrapper}>
			<div className={styles.mainInfo}>
				<div className={styles.infoBlock}>
					<h4 className={styles.title}>{funData?.vids?.title}</h4>
					<FlexRow className={styles.topLineFun}>
            <span className={styles.funType}>{funData?.vids.is_single ? 'Одиночный вид' : 'Групповой вид'}</span>
						{funData?.vids.is_group && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.funTeams}>{`Всего ватаг: ${funData?.vids.groups_count}`}</span>
              </>
            )}
            <div className={styles.dot}></div>
            <span className={styles.funParticipants}>{`Всего участников: ${funData?.vids.users_count}`}</span>
          </FlexRow>
          <div className={styles.descsWrapper}>
          	<p>{funData?.vids.desc}</p>
					</div>
        </div>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
