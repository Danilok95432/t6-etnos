import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SwiperRef } from 'swiper/react'
import { ImageItemWithText } from 'src/types/photos'
import { useGetTraditionByIdQuery } from 'src/store/cultures/cultures.api'

export const EtnosportDetails = () => {
  const { id = '' } = useParams()
    const { data: etnoData } = useGetTraditionByIdQuery(id ?? '')

  const breakPoint = useBreakPoint()
  const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (etnoData) {
      const images: ImageItemWithText[] = []
      if (etnoData.mainphoto) {
        images.push(etnoData.mainphoto[0])
      }
      if (etnoData.photos && Array.isArray(etnoData.photos)) {
        images.push(...etnoData.photos)
      }
      setAllPagePhoto(images)
    }
  }, [etnoData])
  return (
    <div className={styles.etnoDetailTab}>
      <h3>Информация</h3>
      <div className={styles.etnoGallery}>
        <GalleryImg
          className={styles.etnoPhotos}
          images={etnoData?.photos}
          limit={12}
          limitController
          variant='slider'
          allPageImages={allPagePhoto}
        />
      </div>
      <div className={styles.descsWrapper}>
        <p>{etnoData?.desc}</p>
      </div>
    </div>
  )
}
