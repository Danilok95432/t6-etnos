import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GalleryImg } from 'src/components/image-gallery/image-gallery'

import gameStyles from '../../index.module.scss'
import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'
import { useGetGameByIdQuery } from 'src/store/games/games.api'
import { type ImageItemWithText } from 'src/types/photos'

export const GameDetails = () => {
	const { id } = useParams()
	const { data: gameInfo } = useGetGameByIdQuery(id ?? '0')
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useAdditionalCrumbs(gameInfo?.title)

	useEffect(() => {
		if (gameInfo) {
			const images: ImageItemWithText[] = []
			if (gameInfo.mainphoto) {
				images.push(gameInfo.mainphoto[0])
			}
			if (gameInfo.photos && Array.isArray(gameInfo.photos)) {
				images.push(...gameInfo.photos)
			}
			setAllPagePhoto(images)
		}
	}, [gameInfo])

	if (!gameInfo) return <h2>Нет информации об игре</h2>

	return (
		<div className={styles.gameDetails}>
			<div className={styles.gameDetailsInfo}>
				<div className={styles.gameMain}>
					<h2>{gameInfo?.title}</h2>
					{gameInfo.topDesc && <div dangerouslySetInnerHTML={{ __html: gameInfo.topDesc }} />}
				</div>
				<div className={styles.gameLogo}>
					<GalleryImg images={allPagePhoto} variant='newsMain' />
				</div>
			</div>
			<GalleryImg
				className={gameStyles.galleryPhotos}
				images={gameInfo.photos}
				limit={5}
				allPageImages={allPagePhoto}
			/>
			{gameInfo.bottomDesc && <div dangerouslySetInnerHTML={{ __html: gameInfo.bottomDesc }} />}
		</div>
	)
}
