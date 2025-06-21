import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SwiperRef } from 'swiper/react'
import { ImageItemWithText } from 'src/types/photos'

export const FunDetails = () => {
  const { id = '' } = useParams()

  const { data: eventInfo } = useGetEventByIdQuery(id ?? '')

  const breakPoint = useBreakPoint()
  const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (eventInfo) {
      const images: ImageItemWithText[] = []
      if (eventInfo.mainphoto) {
        images.push(eventInfo.mainphoto[0])
      }
      if (eventInfo.photos && Array.isArray(eventInfo.photos)) {
        images.push(...eventInfo.photos)
      }
      setAllPagePhoto(images)
    }
  }, [eventInfo])
  return (
    <div className={styles.funDetailTab}>
      <h3>Информация</h3>
      <div className={styles.funGallery}>
        <GalleryImg
          className={styles.funPhotos}
          images={eventInfo?.photos}
          limit={12}
          limitController
          variant='slider'
          allPageImages={allPagePhoto}
        />
      </div>
      <div className={styles.descsWrapper}>
        <p>
          Вопреки распространенной практике, кулачные бои Атманова Угла не превратились в аттракцион
          для туристов: это — самая настоящая традиция, объединяющая сразу несколько боевых и
          игровых видов спорта (таких, как борьба-за-вороток, русский мяч, кулачный бой
          стенка-на-стенку, кила и другие). Некоторые из этих видов официально признаны государством
          в качестве этноспортивных дисциплин.
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
