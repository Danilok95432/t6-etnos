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
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const EtnosportInfo = () => {
	const { id = '' } = useParams()
	const { data: etnoData } = useGetVidInfoByIdQuery(id ?? '')
	const { openModal } = useActions()

	const breakPoint = useBreakPoint()

	useAdditionalCrumbs(etnoData?.vids?.title)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (etnoData) {
			const images: ImageItemWithText[] = []
			if (etnoData?.vids.mainphoto) {
				images.push(etnoData?.vids.mainphoto[0])
			}
			if (etnoData?.vids.photos && Array.isArray(etnoData?.vids.photos)) {
				images.push(...etnoData?.vids.photos)
			}
			setAllPagePhoto(images)
		}
	}, [etnoData])

	return (
		<div className={styles.etnoInfoWrapper}>
			<div className={styles.mainInfo}>
				<div className={styles.infoBlock}>
					<h4 className={styles.title}>{etnoData?.vids?.title}</h4>
					<FlexRow className={styles.topLineEtno}>
            <span className={styles.etnoType}>{etnoData?.vids.is_single ? 'Одиночный вид' : 'Групповой вид'}</span>
						{etnoData?.vids.is_group && (
              <>
                <div className={styles.dot}></div>
                <span className={styles.funTeams}>{`Всего ватаг: ${etnoData?.vids.groups_count}`}</span>
              </>
            )}
            <div className={styles.dot}></div>
            <span className={styles.etnoParticipants}>{`Всего участников: ${etnoData?.vids.users_count}`}</span>
          </FlexRow>
          <div className={styles.descsWrapper}>
            <p>{etnoData?.vids.desc}</p>
          </div>
        </div>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
