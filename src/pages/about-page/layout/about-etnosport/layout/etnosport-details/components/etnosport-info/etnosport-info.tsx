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

export const EtnosportInfo = () => {
	const { id = '' } = useParams()
	const { data: eventData } = useGetEventByIdQuery(id ?? '')
	const { openModal } = useActions()

	const breakPoint = useBreakPoint()

	useAdditionalCrumbs(eventData?.title)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (eventData) {
			const images: ImageItemWithText[] = []
			if (eventData.mainphoto) {
				images.push(eventData.mainphoto[0])
			}
			if (eventData.photos && Array.isArray(eventData.photos)) {
				images.push(...eventData.photos)
			}
			setAllPagePhoto(images)
		}
	}, [eventData])

	return (
		<div className={styles.etnoInfoWrapper}>
			<div className={styles.mainInfo}>
				<div className={styles.infoBlock}>
					<h4 className={styles.title}>{eventData?.title}</h4>
					<FlexRow className={styles.topLineEtno}>
            <span className={styles.etnoType}>{'Одиночный вид'}</span>
            <div className={styles.dot}></div>
            <span className={styles.etnoParticipants}>{`Всего участников: ${892}`}</span>
          </FlexRow>
          <div className={styles.descsWrapper}>
            <p>Село Атманов Угол славится исконной традицией народного кулачного боя. Исторически достоверные истоки этой традиции датируются 1648 годом: именно тогда впервые прошел сельский праздник «Атмановские Кулачки».</p>
            <p>Традиция эта бережно хранится жителями села по сию пору — уже в наши дни село Атманов Угол ежегодно принимает до двенадцати тысяч гостей и участников праздника, собирающихся со всей России!</p>
          </div>
        </div>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
