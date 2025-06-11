import { useEffect, useState, type FC } from 'react'
import { useLocation } from 'react-router-dom'
import {
	useGetAboutContactsQuery,
	useGetAboutGamesQuery,
	useGetAboutGeneralQuery,
	useGetAboutHistoryQuery,
	useGetAboutNatureQuery,
	useGetAboutTraditionsQuery,
} from 'src/store/about/about.api'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'

export const AboutLayoutHeader: FC = () => {
	const location = useLocation()
	const { data: aboutPageData } = useGetAboutGeneralQuery(null)

	const { data: aboutHistoryData } = useGetAboutHistoryQuery(null, {
		skip: location.pathname !== '/about/about-history',
	})
	const { data: aboutNatureData } = useGetAboutNatureQuery(null, {
		skip: location.pathname !== '/about/about-nature',
	})
	const { data: aboutContactsData } = useGetAboutContactsQuery(null, {
		skip: location.pathname !== '/about/about-contacts',
	})
	const { data: aboutTraditionData } = useGetAboutTraditionsQuery(null, {
		skip: location.pathname !== '/about/about-traditions',
	})
	const { data: aboutGamesData } = useGetAboutGamesQuery(null, {
		skip: location.pathname !== '/about/about-games',
	})

	const getPhotosForCurrentPage = (): ImageItemWithText[] => {
		switch (location.pathname) {
			case '/about':
				return aboutPageData?.photoGallery ?? []
			case '/about/about-history':
				return aboutHistoryData?.photos ?? []
			case '/about/about-nature':
				return aboutNatureData?.photos ?? []
			case '/about/about-contacts':
				return aboutContactsData?.photos ?? []
			case '/about/about-traditions':
				return aboutTraditionData?.photoGallery ?? []
			case '/about/about-games':
				return aboutGamesData?.photoGallery ?? []
			default:
				return []
		}
	}

	const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])

	useEffect(() => {
		const photos = getPhotosForCurrentPage()
		const images: ImageItemWithText[] = []

		if (aboutPageData?.mainphoto[0]) {
			images.push(aboutPageData?.mainphoto[0])
		}

		if (photos.length > 0) {
			images.push(...photos)
		}

		setAllPagePhoto(images)
	}, [
		aboutPageData,
		aboutHistoryData,
		aboutNatureData,
		aboutContactsData,
		aboutTraditionData,
		aboutGamesData,
		location.pathname,
	])

	return (
		<div className={styles.aboutLayoutHeaderPageContent}>
			<div className={styles.leftSideHeader}>
				<h2 className={styles.title}>Атманов угол</h2>
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
			</div>
			<div className={styles.rightSideHeader}>
				<GalleryImg images={allPagePhoto} variant='newsMain' />
			</div>
		</div>
	)
}
