import { useEffect, useState, type FC } from 'react'

import { useParams } from 'react-router-dom'
import { useGetEventByIdQuery } from 'src/store/events/events.api'

import { RenderedArray } from 'src/components/rendered-array/rendered-array'
import { Placement } from 'src/modules/placement/placement'
import { AccordionItem } from 'src/components/accordion-item/accordion-item'

import styles from './index.module.scss'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { DetailedAside } from 'src/modules/detailedAside/detailedAside'
import { type ImageItemWithText } from 'src/types/photos'

export const EventDetails: FC = () => {
	const { id = '' } = useParams()

	const { data: eventInfo } = useGetEventByIdQuery(id ?? '')

	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (eventInfo) {
			const images: ImageItemWithText[] = []
			if (eventInfo.mainphoto) {
				images.push(eventInfo.mainphoto[0])
			}
			if (eventInfo.photos && Array.isArray(eventInfo.photos)) {
				images.push(...eventInfo.photos)
			}
			setAllPagePhoto(images)
		}
	}, [eventInfo])

	return (
		<div className={styles.eventDetailTab}>
			<div className={styles.eventGallery}>
				<GalleryImg
					className={styles.eventPhotos}
					images={eventInfo?.photos}
					limit={12}
					limitController
					variant='slider'
					allPageImages={allPagePhoto}
				/>
				{/* <button type='button' className={styles.eventGalleryButton}>
					Показать еще
				</button>
				*/}
			</div>
			{!!eventInfo?.descs?.length && (
				<section>
					<h4>Информация</h4>
					<RenderedArray
						className={styles.eventDescs}
						strArray={eventInfo?.descs}
						as='div'
						asStr='p'
					/>
				</section>
			)}

			{eventInfo && (
				<section>
					<h4>Условия участия</h4>
					<RenderedArray
						className={styles.eventDescs}
						strArray={[eventInfo?.conditions ?? '']}
						as='div'
						asStr='p'
					/>
				</section>
			)}

			{eventInfo && (
				<section>
					<h4>Расписание</h4>
					<RenderedArray
						className={styles.eventDescs}
						strArray={[eventInfo?.raspisanie ?? '']}
						as='div'
						asStr='p'
					/>
				</section>
			)}

			<section className={styles.mapSection}>
				<Placement placeVariants={eventInfo?.pathways} title='Как добраться' />
			</section>
			<section>
				<Placement placeVariants={eventInfo?.placement} title='Размещение' />
			</section>
			{!!eventInfo?.faq?.length && (
				<section>
					<h4>Часто задаваемые вопросы</h4>
					<div className={styles.faqList}>
						{eventInfo?.faq?.map((faqEl, idx) => (
							<AccordionItem
								className={styles.eventFaqItem}
								key={idx}
								trigger={faqEl.title}
								content={faqEl.content}
							/>
						))}
					</div>
				</section>
			)}
			<DetailedAside
				className={styles.footerSection}
				brandImg={eventInfo?.brandImg}
				genPartnerImg={eventInfo?.partnerImg}
				partners={eventInfo?.partners}
				organizers={eventInfo?.organizerLinks}
				documents={eventInfo?.documents}
				links={eventInfo?.relatedLinks}
			/>
		</div>
	)
}
