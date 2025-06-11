import React, { type FC } from 'react'

import styles from './index.module.scss'
import styled from 'styled-components'

type PhotoGalleryItem = {
	id: string
	photoUrl: string
	description?: string
}

type PhotoGalleryProps = {
	title?: string
	photos?: PhotoGalleryItem[]
	className?: string
	$photoWidth?: string
	$photoHeight?: string
	$photoBorder?: string
} & React.CSSProperties

const StyledPhoto = styled.div<PhotoGalleryProps>`
	width: ${({ $photoWidth }) => $photoWidth ?? '164px'};
	height: ${({ $photoHeight }) => $photoHeight ?? '127px'};
	border: ${({ $photoBorder }) => $photoBorder ?? '7px solid #EBEEF2'};
	img {
		width: 100%;
		height: 100%;
	}
`

export const PhotoGallery: FC<PhotoGalleryProps> = ({
	title,
	photos = [],
	className,
	$photoBorder,
	$photoWidth,
	$photoHeight,
}) => {
	if (photos?.length < 1) return null
	return (
		<div className={className}>
			{title && <h4>{title}</h4>}
			<ul className={styles.gallery}>
				{photos?.map((item) => (
					<li key={item.id}>
						<StyledPhoto
							$photoHeight={$photoHeight}
							$photoWidth={$photoWidth}
							$photoBorder={$photoBorder}
						>
							<img src={item.photoUrl} alt={item.description} />
						</StyledPhoto>
						<p>{item.description}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
