import React, { type FC } from 'react'

import classNames from 'classnames'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'

import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'

interface IGallerySectionProps {
	className?: string
	images?: ImageItemWithText[]
	allPagePhoto?: ImageItemWithText[]
}

export const GallerySection: FC<IGallerySectionProps> = ({ className, images, allPagePhoto }) => {
	if (!images) return null

	return (
		<section className={classNames(styles.gallerySection, className)}>
			<GalleryImg images={images} allPageImages={allPagePhoto} variant='slider' />
		</section>
	)
}
