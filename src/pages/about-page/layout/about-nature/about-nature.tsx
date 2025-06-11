import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { useGetAboutGeneralQuery, useGetAboutNatureQuery } from 'src/store/about/about.api'
import { GallerySection } from 'src/modules/gallery-section/gallery-section'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { type ImageItemWithText } from 'src/types/photos'

export const AboutNature: FC = () => {
	const { data: aboutPageData } = useGetAboutNatureQuery(null)
	const breakpoint = useBreakPoint()

	const { data: aboutGeneralData } = useGetAboutGeneralQuery(null)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (aboutGeneralData && aboutPageData) {
			const images: ImageItemWithText[] = []
			if (aboutGeneralData?.mainphoto[0]) {
				images.push(aboutGeneralData?.mainphoto[0])
			}
			if (aboutPageData.photos && Array.isArray(aboutPageData.photos)) {
				images.push(...aboutPageData.photos)
			}
			setAllPagePhoto(images)
		}
	}, [aboutPageData, aboutGeneralData])

	if (!aboutPageData) return null

	return (
		<div className={styles.naturePageContent}>
			<Helmet>
				<title>Природа Атманова угла</title>
			</Helmet>
			<div className={styles.inner}>
				{breakpoint === 'S' && <h2>Природа Атманова угла</h2>}
				{aboutPageData?.topDescs && (
					<div
						className={styles.topDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.topDescs }}
					/>
				)}
				<GallerySection images={aboutPageData?.photos} allPagePhoto={allPagePhoto} />
				{aboutPageData?.bottomDescs && (
					<div
						className={styles.bottomDesc}
						dangerouslySetInnerHTML={{ __html: aboutPageData.bottomDescs }}
					/>
				)}
			</div>
		</div>
	)
}
