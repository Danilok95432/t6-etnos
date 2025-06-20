import { useEffect, useState, type FC } from 'react'
import { useLocation } from 'react-router-dom'
import {
  useGetAboutGeneralQuery,
} from 'src/store/about/about.api'
import styles from './index.module.scss'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const AboutLayoutHeader: FC = () => {
  const location = useLocation()
  const { data: aboutPageData } = useGetAboutGeneralQuery(null)
  const breakPoint = useBreakPoint()

  const getPhotosForCurrentPage = (): ImageItemWithText[] => {
    switch (location.pathname) {
      case '/about':
        return aboutPageData?.photoGallery ?? []
      case '/about/about-etnosport':
        return aboutPageData?.photoGallery ?? []
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
    location.pathname,
  ])

	if (location.pathname === '/about/about-etnosport') {
		return <h2 className={styles.title}>Русский этноспорт</h2>
	}

	if (location.pathname === '/about/about-fun') {
		return <h2 className={styles.title}>Исконные забавы</h2>
	}

  if (location.pathname === '/about') {
    return (
      <div className={styles.aboutLayoutHeaderPageContent}>
        <div className={styles.leftSideHeader}>
          <h2 className={styles.title}>
            {breakPoint === 'S' ? 'Русский этноспорт' : 'Об этноспорте'}
          </h2>
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
}

