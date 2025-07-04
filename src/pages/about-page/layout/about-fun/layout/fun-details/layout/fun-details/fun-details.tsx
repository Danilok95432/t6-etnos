import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SwiperRef } from 'swiper/react'
import { ImageItemWithText } from 'src/types/photos'
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const FunDetails = () => {
  const { id = '' } = useParams()
  const { data: funData } = useGetVidInfoByIdQuery(id ?? '')

  const breakPoint = useBreakPoint()
  const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (funData) {
      const images: ImageItemWithText[] = []
      if (funData?.vids.mainphoto) {
        images.push(funData?.vids.mainphoto[0])
      }
      if (funData?.vids.photos && Array.isArray(funData?.vids.photos)) {
        images.push(...funData?.vids.photos)
      }
      setAllPagePhoto(images)
    }
  }, [funData])
  return (
    <div className={styles.funDetailTab}>
      <h3>Информация</h3>
      <div className={styles.funGallery}>
        <GalleryImg
          className={styles.funPhotos}
          images={funData?.vids?.photos}
          limit={12}
          limitController
          variant='slider'
          allPageImages={allPagePhoto}
        />
      </div>
      <div className={styles.descsWrapper}>
        <p>
          <p>{funData?.vids?.desc}</p>
        </p>
      </div>
    </div>
  )
}
