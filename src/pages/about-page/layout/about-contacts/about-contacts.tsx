import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { ContactsMap } from 'src/components/contacts-map/contacts-map'
import { ContactsInfo } from './components/contacts-info/contacts-info'

import styles from './index.module.scss'
import { useGetAboutContactsQuery, useGetAboutGeneralQuery } from 'src/store/about/about.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { GallerySection } from 'src/modules/gallery-section/gallery-section'
import { type ImageItemWithText } from 'src/types/photos'
export const AboutContacts: FC = () => {
	const { data: aboutContactsData } = useGetAboutContactsQuery(null)
	const breakpoint = useBreakPoint()

	const { data: aboutGeneralData } = useGetAboutGeneralQuery(null)
	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
	useEffect(() => {
		if (aboutGeneralData && aboutContactsData) {
			const images: ImageItemWithText[] = []
			if (aboutGeneralData?.mainphoto[0]) {
				images.push(aboutGeneralData?.mainphoto[0])
			}
			if (aboutContactsData.photos && Array.isArray(aboutContactsData.photos)) {
				images.push(...aboutContactsData.photos)
			}
			setAllPagePhoto(images)
		}
	}, [aboutContactsData, aboutGeneralData])

	return (
		<div className={styles.contactsPageContent}>
			<Helmet>
				<title>Карта и маршруты</title>
			</Helmet>
			{breakpoint === 'S' && <h3 className={styles.titleContacts}>Карта и маршруты</h3>}
			<p className={styles.topDescs}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			{aboutContactsData?.topDesc && (
				<div
					className={styles.topDescs}
					dangerouslySetInnerHTML={{ __html: aboutContactsData.topDesc }}
				/>
			)}
			<ContactsInfo />
			<ContactsMap className={styles.aboutMap} points={aboutContactsData?.map_coords} zoom={17} />
			<GallerySection images={aboutContactsData?.photos} allPagePhoto={allPagePhoto} />
		</div>
	)
}
