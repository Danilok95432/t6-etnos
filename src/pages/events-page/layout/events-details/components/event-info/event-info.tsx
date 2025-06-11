import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { formatDateRange, mainFormatDate, parseTimeFromDate } from 'src/helpers/utils'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import { InfoRow } from 'src/UI/InfoRow/InfoRow'
import { CustomText } from 'src/components/custom-text/custom-text'
import { AppRoute } from 'src/routes/main-routes/consts'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { EventStatus } from 'src/components/event-status/event-status'
import { ObjectIconSVG } from 'src/UI/icons/objectIconSVG'
import { PlaceIconSVG } from 'src/UI/icons/placeIconSVG'
import { SiteIconSVG } from 'src/UI/icons/siteIconSVG'
import { PhoneEventIconSVG } from 'src/UI/icons/phoneEventIconSVG'
import { TgEventIconSVG } from 'src/UI/icons/tgEventIconSVG'
import { MailEventIconSVG } from 'src/UI/icons/mailEventIconSVG'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'

export const EventInfo = () => {
	const { id = '' } = useParams()
	const { data: eventData } = useGetEventByIdQuery(id ?? '')

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
		<div className={styles.eventInfoWrapper}>
			<div className={styles.mainInfo}>
				<div className={styles.infoBlock}>
					<h2>{eventData?.title}</h2>
					<FlexRow className={styles.topLineEvent}>
						<CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
							{eventData?.date && eventData.date.length > 1
								? formatDateRange(eventData?.date as [Date, Date])
								: mainFormatDate(eventData?.date[0])}
						</CustomText>
						<div className={styles.dot}></div>
						<CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
							{eventData?.event_type_name}
						</CustomText>
						<div className={styles.dot}></div>
						<EventStatus className={styles.status} statusCode={eventData?.status} />
						<div className={cn(styles.dot, styles._red)}></div>
						<CustomText
							className={styles.ageRating}
							$fontSize={breakPoint === 'S' ? '18px' : '16px'}
							$color='#DE0008'
						>
							{eventData?.ageRating}+
						</CustomText>
					</FlexRow>
					<CustomText $lineHeight='1.3' $margin='0 0 10px 0' className={styles.infoBlockText}>
						{eventData?.description}
					</CustomText>
					<CustomText $lineHeight='1.3' $margin='0 0 15px 0' className={styles.infoBlockText}>
						{eventData?.date[0]
							? `Начало в ${parseTimeFromDate(eventData?.date[0])}`
							: 'Нет информации о времени начала'}
					</CustomText>
					<div className={styles.listInfo}>
						<div className={styles.locationInfo}>
							{eventData?.location?.address && (
								<InfoRow
									title='Место проведения:'
									label={
										<span className={styles.infoBlockText}>{eventData?.location?.address}</span>
									}
									icon={<PlaceIconSVG />}
									$titleWidth='auto'
									$gap='10px'
									$margin='0'
									$alignItems='center'
								/>
							)}

							{eventData?.object?.title && (
								<InfoRow
									title='Объект:'
									label={
										<Link
											to={`/${AppRoute.Objects}/${eventData?.object.id}`}
											className={styles.infoBlockText}
										>
											{eventData?.object.title}
										</Link>
									}
									icon={<ObjectIconSVG />}
									$titleWidth='auto'
									$gap='10px'
									$margin='0'
									$alignItems='center'
									titleClassname={styles.infoBlockText}
								/>
							)}

							{eventData?.website && (
								<InfoRow
									title='Сайт события:'
									label={
										<a href={eventData?.website} className={styles.infoBlockText}>
											{eventData?.website}
										</a>
									}
									icon={<SiteIconSVG />}
									$titleWidth='auto'
									$gap='10px'
									$margin='0'
									$alignItems='center'
									titleClassname={styles.infoBlockText}
								/>
							)}
						</div>
						<div className={styles.contactsInfo}>
							{eventData?.contact_telphone && (
								<InfoRow
									title='Телефон:'
									label={
										<a href={`tel:${eventData?.contact_telphone}`} className={styles.infoBlockText}>
											{eventData?.contact_telphone}
										</a>
									}
									icon={<PhoneEventIconSVG />}
									$titleWidth='auto'
									$gap='10px'
									$margin='0'
									$alignItems='center'
									titleClassname={styles.infoBlockText}
								/>
							)}

							{eventData?.contact_tg && (
								<InfoRow
									title='Телеграм:'
									label={
										<a href={eventData?.contact_tg} className={styles.infoBlockText}>
											{eventData?.contact_tg}
										</a>
									}
									icon={<TgEventIconSVG />}
									$titleWidth='auto'
									$gap='10px'
									$margin='0'
									$alignItems='center'
									titleClassname={styles.infoBlockText}
								/>
							)}

							{eventData?.contact_email && (
								<InfoRow
									title='Электронная почта:'
									label={
										<a href={`mailto:${eventData?.contact_email}`} className={styles.infoBlockText}>
											{eventData?.contact_email}
										</a>
									}
									icon={<MailEventIconSVG />}
									$titleWidth='auto'
									$gap='10px'
									$margin='0'
									$alignItems='center'
									titleClassname={styles.infoBlockText}
								/>
							)}
						</div>
					</div>
				</div>
				<div className={styles.avatarWrapper}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
		</div>
	)
}
