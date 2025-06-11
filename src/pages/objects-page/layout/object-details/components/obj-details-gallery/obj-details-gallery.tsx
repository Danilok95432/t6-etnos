import React, { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'

import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'

export const ObjDetailsGallery: FC = () => {
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

	if (!objectData?.photos?.length) return null

	return (
		<section className={styles.gallerySection}>
			<GalleryImg
				className={styles.objPhotos}
				images={objectData?.photos}
				limit={9}
				allPageImages={allPagePhoto}
			/>
		</section>
	)
}
