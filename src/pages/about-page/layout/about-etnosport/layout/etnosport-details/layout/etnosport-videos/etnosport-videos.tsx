import { type FC, type RefObject, useRef } from 'react'
import { type SwiperRef } from 'swiper/react/swiper-react'

import { Swiper, SwiperSlide } from 'swiper/react'

import { useGetHomeVideosQuery } from 'src/store/home/home.api'
import { VideoCard } from 'src/components/video-card/video-card'

import { SliderBtns } from 'src/components/slider-btns/slider-btns'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { etnoVideosSliderOptions } from './consts'
import { MobileList } from 'src/components/mobile-list/mobile-list'

export const EtnosportVideos: FC = () => {
  const { data: videos } = useGetHomeVideosQuery(null)
  const breakpoint = useBreakPoint()
  const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
  return (
    <div className={styles.etnoVideosPage}>
      <h2>Видеолента</h2>
      {breakpoint === 'S' ? (
        <MobileList
          items={videos ?? []}
          renderItem={VideoCard}
          classListItems={styles.etnosportVideosTab}
          defaultVisibleCount={3}
          classNameBtn={styles.showMoreBtnTab}
        />
      ) : (
        <div className='slider-with-btns'>
          <Swiper {...etnoVideosSliderOptions} ref={swiperRef}>
            {videos?.map((slideItem, idx) => (
              <SwiperSlide key={idx}>
                <VideoCard key={slideItem.id} {...slideItem} />
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderBtns
            className={styles.videoSliderBtns}
            $topPosition='42%'
            $btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '97%'}
            swiperRef={swiperRef}
            color={'#5C5C5C'}
          />
        </div>
      )}
    </div>
  )
}
