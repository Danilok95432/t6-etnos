import { RefObject, useEffect, useMemo, useRef, useState, type FC } from 'react'

import { useParams } from 'react-router-dom'
import {
  useGetEventByIdQuery,
  useGetEventNewsByIdQuery,
  useGetEventProgramByIdQuery,
  useGetEventVideosByIdQuery,
} from 'src/store/events/events.api'

import styles from './index.module.scss'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { type ImageItemWithText } from 'src/types/photos'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { NewsCard } from 'src/components/news-card/news-card'
import { VideoCard } from 'src/components/video-card/video-card'
import { cicleDetailsSliderOptions } from './consts'
import { CardNewsItem } from 'src/types/news'
import { useGetHomeNewsQuery } from 'src/store/home/home.api'

export const CicleInfo: FC = () => {
  const { id = '' } = useParams()

  const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
  const { data: programDays } = useGetEventProgramByIdQuery(id)
  const { data: newsList } = useGetHomeNewsQuery(null)
  const { data: eventVideos } = useGetEventVideosByIdQuery(id)
  const [view, setView] = useState<string>('list')

  const breakPoint = useBreakPoint()
  const swiperNewsRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
  const swiperVideoRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

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

  const { mainNews, topNews } = useMemo(() => {
    if (!newsList) {
      return { mainNews: null, topNews: [] }
    }

    if (newsList.length < 5) {
      return { mainNews: null, topNews: [] }
    }

    const sortedNews = [...newsList].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    let mainNewsItem = sortedNews.find((news) => news.main) ?? null
    if (mainNewsItem) {
      const mainNewsList = sortedNews.filter((news) => news.main)
      mainNewsItem = mainNewsList[0]
    }

    let topNewsItems: CardNewsItem[] = []

    if (mainNewsItem) {
      const filtered = sortedNews.filter((news) => news.id !== mainNewsItem?.id)

      if (breakPoint === 'breakPoint') {
        topNewsItems = filtered.slice(0, 1)
      } else if (breakPoint === 'ShortLg' || breakPoint === 'L') {
        topNewsItems = []
      } else if (breakPoint === 'S') {
        mainNewsItem = null
        topNewsItems = []
      } else {
        topNewsItems = filtered.slice(0, 2)
      }
    } else {
      topNewsItems = sortedNews.slice(0, 5)
    }

    return { mainNews: mainNewsItem, topNews: topNewsItems }
  }, [newsList, breakPoint])

  const sliderNews = useMemo(() => {
    if (!newsList) return []

    const excludedNewsIds: string[] = []

    if (mainNews) {
      excludedNewsIds.push(mainNews.id)
    }
    excludedNewsIds.push(...topNews.map((news) => news.id))

    return newsList.filter((news) => !excludedNewsIds.includes(news.id))
  }, [newsList, mainNews, topNews])

  return (
    <div className={styles.cicleDetailTab}>
      <h2>Информация о цикле</h2>
      <div className={styles.cicleGallery}>
        <GalleryImg
          className={styles.ciclePhotos}
          images={eventInfo?.photos}
          limit={12}
          limitController
          variant='slider'
          allPageImages={allPagePhoto}
        />
        {/* <button type='button' className={styles.eventGalleryButton}>
					Показать еще
				</button>
				*/}
      </div>

      {newsList && (
        <section className={styles.newsSection}>
          <h4>Новости</h4>
          {(breakPoint === 'L' || breakPoint === 'sliderBtnsPoint') && (
            <div className={styles.breakpointNews}>
              {mainNews ? (
                <>
                  <div className={styles.mainNews}>
                    <NewsCard {...mainNews} mainStatus={true} className={styles.mainNewsCard} />
                  </div>
                  <div className={styles.topNews}>
                    {topNews.map((news) => (
                      <NewsCard className={styles.defaultNewsCard} key={news.id} {...news} />
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.topNews}>
                  {topNews.map((news) => (
                    <NewsCard className={styles.defaultNewsCard} key={news.id} {...news} />
                  ))}
                </div>
              )}
            </div>
          )}
          {sliderNews?.length > 0 && (
            <div className='slider-with-btns'>
              <Swiper {...cicleDetailsSliderOptions} ref={swiperNewsRef}>
                {sliderNews.map((newsEl, idx) => (
                  <SwiperSlide className={styles.newsSlide} key={idx}>
                    <NewsCard key={newsEl.id} {...newsEl} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <SliderBtns
                className={styles.newsSliderBtns}
                $topPosition='50%'
                $btnsSpacing={breakPoint === 'sliderBtnsPoint' ? '1400px' : '97%'}
                swiperRef={swiperNewsRef}
                color={'#5C5C5C'}
              />
            </div>
          )}
        </section>
      )}

      {eventVideos && (
        <section className={styles.sliderSection}>
          <h4>Видеолента</h4>
          <div>
            <Swiper {...cicleDetailsSliderOptions} ref={swiperVideoRef}>
              {eventVideos?.map((slideItem, idx) => (
                <SwiperSlide key={idx}>
                  <VideoCard key={slideItem.id} {...slideItem} />
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderBtns
              className={styles.videoSliderBtns}
              $topPosition='52%'
              $btnsSpacing={breakPoint === 'sliderBtnsPoint' ? 'calc(100% + 50px)' : '97%'}
              swiperRef={swiperVideoRef}
              color={'#5C5C5C'}
            />
          </div>
        </section>
      )}
    </div>
  )
}

