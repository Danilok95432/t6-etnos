import { useEffect, useState, type FC } from 'react'

import { useParams } from 'react-router-dom'

import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import { InfoRow } from 'src/UI/InfoRow/InfoRow'
import { SimpleLink } from 'src/components/simple-link/simple-link'

import { CustomText } from 'src/components/custom-text/custom-text'
import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'

import skeleton from 'src/assets/img/skeleton-img.png'
import styles from './index.module.scss'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { type ImageItemWithText } from 'src/types/photos'

export const ObjectHeader: FC = () => {
	const { id } = useParams()

	const { data: objectData } = useGetObjectByIdQuery(id ?? '')
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		if (objectData) {
			const images: ImageItemWithText[] = []
			if (objectData.mainphoto) {
				images.push(objectData.mainphoto[0])
			}
			if (objectData.photos && Array.isArray(objectData.photos)) {
				images.push(...objectData.photos)
			}
			setAllPagePhoto(images)
		}
	}, [objectData])

	useAdditionalCrumbs(objectData?.title)

	return (
		<section className={styles.objectHeader}>
			<div className={styles.objectInfoWrapper}>
				<div className={styles.objectMainInfo}>
					{objectData?.title && <h2>{objectData?.title}</h2>}
					<CustomText
						// $fontSize='20px'
						$margin='0 0 30px 0'
						$lineHeight='1.2'
						className={styles.objectMainDesc}
					>
						{objectData?.mainDesc}
					</CustomText>
					{objectData?.phone && (
						<InfoRow
							wrapperClassname={styles.objectMainDesc}
							titleClassname={styles.phoneTitle}
							title='Телефон:'
							label={objectData?.phone}
						/>
					)}
					{objectData?.email && (
						<InfoRow
							wrapperClassname={styles.objectMainDesc}
							titleClassname={styles.mailTitle}
							title='Электронная почта:'
							label={<SimpleLink title={objectData?.email} link={objectData?.email} isEmail />}
						/>
					)}

					{objectData?.address && (
						<InfoRow
							wrapperClassname={styles.objectMainDesc}
							titleClassname={styles.addressTitle}
							title='Адрес объекта:'
							label={objectData?.address}
						/>
					)}

					{objectData?.tgSoc && (
						<InfoRow
							wrapperClassname={styles.objectMainDesc}
							titleClassname={styles.tgTitle}
							title='Телеграм:'
							label={<SimpleLink title={objectData?.tgSoc} link={objectData?.tgSoc} />}
						/>
					)}

					{objectData?.vkSoc && (
						<InfoRow
							wrapperClassname={styles.objectMainDesc}
							titleClassname={styles.vkTitle}
							title='Вконтакте:'
							label={<SimpleLink title={objectData?.vkSoc} link={objectData?.vkSoc} />}
							$margin='0'
						/>
					)}
				</div>
				{objectData?.mainphoto[0]?.original ? (
					<div className={styles.logoContainer}>
						<GalleryImg images={allPagePhoto} variant='newsMain' />
					</div>
				) : (
					<div className={styles.logoContainer}>
						<img className={styles.skeleton} src={skeleton} alt={objectData?.title} />
					</div>
				)}
			</div>
		</section>
	)
}
