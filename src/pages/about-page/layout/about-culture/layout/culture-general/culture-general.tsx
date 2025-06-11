import React, { useEffect, useState, type FC } from 'react'

import { CultureElement } from 'src/components/culture-element/culture-element'
import { useGetAboutGeneralQuery, useGetAboutTraditionsQuery } from 'src/store/about/about.api'
import { GallerySection } from 'src/modules/gallery-section/gallery-section'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { type ImageItemWithText } from 'src/types/photos'

export const CultureGeneral: FC = () => {
	const { data: aboutPageData } = useGetAboutTraditionsQuery(null)
	const breakpoint = useBreakPoint()

	const { data: aboutGeneralData } = useGetAboutGeneralQuery(null)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (aboutGeneralData && aboutPageData) {
			const images: ImageItemWithText[] = []
			if (aboutGeneralData?.mainphoto[0]) {
				images.push(aboutGeneralData?.mainphoto[0])
			}
			if (aboutPageData.photoGallery && Array.isArray(aboutPageData.photoGallery)) {
				images.push(...aboutPageData.photoGallery)
			}
			setAllPagePhoto(images)
		}
	}, [aboutPageData, aboutGeneralData])

	if (!aboutPageData) return null

	return (
		<>
			<div className={styles.inner}>
				{breakpoint === 'S' && <h2>Традиции Атманова угла</h2>}
				<div className={styles.culturesDescription}>
					{aboutPageData?.topDesc && (
						<div dangerouslySetInnerHTML={{ __html: aboutPageData.topDesc }} />
					)}
				</div>
				<GallerySection images={aboutPageData?.photoGallery} allPagePhoto={allPagePhoto} />
				{aboutPageData.bottomDesc !== 'null' ? <p>{aboutPageData.bottomDesc}</p> : null}
				{aboutPageData.traditions?.length && (
					<div className={styles.culturesList}>
						{aboutPageData.traditions.map(({ id, desc, title }) => (
							<CultureElement key={id} id={id} title={title} desc={desc} />
						))}
					</div>
				)}
			</div>
		</>
	)
}
