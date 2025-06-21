import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SwiperRef } from 'swiper/react'
import { ImageItemWithText } from 'src/types/photos'
import { useGetGameByIdQuery } from 'src/store/games/games.api'

export const FunDetails = () => {
  const { id = '' } = useParams()
  const { data: funData } = useGetGameByIdQuery(id ?? '')

  const breakPoint = useBreakPoint()
  const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (funData) {
      const images: ImageItemWithText[] = []
      if (funData.mainphoto) {
        images.push(funData.mainphoto[0])
      }
      if (funData.photos && Array.isArray(funData.photos)) {
        images.push(...funData.photos)
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
          images={funData?.photos}
          limit={12}
          limitController
          variant='slider'
          allPageImages={allPagePhoto}
        />
      </div>
      <div className={styles.descsWrapper}>
        <p>
          <p>{funData?.desc}</p>
        </p>
        <p>
          Помимо любителей собственно народной традиции, боевые традиции Атманова Угла привлекают
          внимание и серьезных специалистов: культурологов, историков, источниковедов, спортивных
          тренеров и судей: такое внимание позволяет сочетать бережное отношение к народной традиции
          и активное развитие упомянутых выше видов спорта и народных забав.
        </p>
      </div>
    </div>
  )
}
