import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { useGetAboutGeneralQuery } from 'src/store/about/about.api'

import { GallerySection } from 'src/modules/gallery-section/gallery-section'
import { DescSection } from 'src/pages/about-page/layout/about-general/components/desc-section/desc-section'
import { CollapsibleText } from 'src/components/collapsible-text/collapsible-text'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { type ImageItemWithText } from 'src/types/photos'

export const AboutGeneral: FC = () => {
	const { data: aboutPageData } = useGetAboutGeneralQuery(null)
	const breakpoint = useBreakPoint()
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (aboutPageData) {
			const images: ImageItemWithText[] = []
			if (aboutPageData?.mainphoto[0]) {
				images.push(aboutPageData?.mainphoto[0])
			}
			if (aboutPageData.photoGallery && Array.isArray(aboutPageData.photoGallery)) {
				images.push(...aboutPageData.photoGallery)
			}
			setAllPagePhoto(images)
		}
	}, [aboutPageData])
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>Атманов угол</title>
			</Helmet>

			<div className={styles.inner}>
				{breakpoint === 'S' && <h2>Атманов угол</h2>}
				{breakpoint === 'S' && (
					<div className={styles.blockquoteBody}>
						{aboutPageData?.mainDescs && (
							<div
								className={styles.mainDescs}
								dangerouslySetInnerHTML={{ __html: aboutPageData.mainDescs }}
							/>
						)}
						{aboutPageData?.caption && aboutPageData?.caption_show && (
							<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
						)}
					</div>
				)}
				<GallerySection images={aboutPageData?.photoGallery} allPagePhoto={allPagePhoto} />
				<CollapsibleText item={<DescSection />} lineClamp={22} collapsePoint={'S'} />
			</div>
		</div>
	)
}
