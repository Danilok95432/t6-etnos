import { RefObject, useEffect, useMemo, useRef, useState, type FC } from 'react'

import { useParams } from 'react-router-dom'
import {
  useGetEventByIdQuery,
  useGetEventNewsByIdQuery,
  useGetEventProgramByIdQuery,
  useGetEventVideosByIdQuery,
} from 'src/store/events/events.api'

import { RenderedArray } from 'src/components/rendered-array/rendered-array'
import { AccordionItem } from 'src/components/accordion-item/accordion-item'

import styles from './index.module.scss'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { DetailedAside } from 'src/modules/detailedAside/detailedAside'
import { type ImageItemWithText } from 'src/types/photos'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { eventSliderOptions } from './sliderConsts'
import { Program } from 'src/modules/program/program'
import { GridRow } from 'src/components/grid-row/grid-row'
import { NewsCard } from 'src/components/news-card/news-card'
import { VideoCard } from 'src/components/video-card/video-card'
import { eventDetailsSliderOptions } from './consts'
import { CardNewsItem } from 'src/types/news'

export const EventDetails: FC = () => {
  const { id = '' } = useParams()

  const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
  const { data: programDays } = useGetEventProgramByIdQuery(id)
  const { data: newsList } = useGetEventNewsByIdQuery(id ?? '')
  const { data: eventVideos } = useGetEventVideosByIdQuery(id)

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

  const mockFaq = [
    { title: 'faq1', content: 'content1' },
    { title: 'faq2', content: 'content2' },
    { title: 'faq3', content: 'content3' },
  ]

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
    <div className={styles.eventDetailTab}>
      <h2>О событии</h2>
      <div className={styles.eventGallery}>
        <GalleryImg
          className={styles.eventPhotos}
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
      {!!eventInfo?.descs?.length && (
        <section>
          <RenderedArray
            className={styles.eventDescs}
            strArray={eventInfo?.descs}
            as='div'
            asStr='p'
          />
        </section>
      )}

      {eventInfo && (
        <section>
          <h4>Организаторы</h4>
          <div className={styles.partnerSlider}>
            <Swiper {...eventSliderOptions} ref={swiperRef}>
              {eventInfo?.partners?.map((slideItem, idx) => (
                <SwiperSlide key={idx} className={styles.partnerSlide}>
                  <div className={styles.partnerCard} key={slideItem.id_partner}>
                    <a href={slideItem.itemlink} className={styles.partnersLink}>
                      {/*
												<img
												src={slideItem.mainphoto[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
												*/}
                      <p>{slideItem.title}</p>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderBtns
              className={styles.partnersSliderBtns}
              $topPosition='82%'
              $btnsSpacing={breakPoint === 'sliderBtnsPoint' ? 'calc(100% + 50px)' : '90%'}
              swiperRef={swiperRef}
              color='#5C5C5C'
            />
          </div>
        </section>
      )}

      {eventInfo && (
        <section>
          <h4>Партнеры</h4>
          <div className={styles.partnerSlider}>
            <Swiper {...eventSliderOptions} ref={swiperRef}>
              {eventInfo?.partners?.map((slideItem, idx) => (
                <SwiperSlide key={idx} className={styles.partnerSlide}>
                  <div className={styles.partnerCard} key={slideItem.id_partner}>
                    <a href={slideItem.itemlink} className={styles.partnersLink}>
                      {/*
												<img
												src={slideItem.mainphoto[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
												*/}
                      <p>{slideItem.title}</p>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderBtns
              className={styles.partnersSliderBtns}
              $topPosition='82%'
              $btnsSpacing={breakPoint === 'sliderBtnsPoint' ? 'calc(100% + 50px)' : '90%'}
              swiperRef={swiperRef}
              color='#5C5C5C'
            />
          </div>
        </section>
      )}

      {programDays && (
        <section>
          <div className={styles.programTab}>
            <h4>Программа</h4>
            <Program programDays={programDays ?? []} />
          </div>
        </section>
      )}

      {newsList && (
        <section>
          <h4>Новости события</h4>
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
              <Swiper {...eventDetailsSliderOptions} ref={swiperRef}>
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
                swiperRef={swiperRef}
                color={'#5C5C5C'}
              />
            </div>
          )}
        </section>
      )}

      {eventVideos && (
        <section className={styles.sliderSection}>
          <h4>Видеолента события</h4>
          <div>
            <Swiper {...eventDetailsSliderOptions} ref={swiperRef}>
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
              swiperRef={swiperRef}
              color={'#5C5C5C'}
            />
          </div>
        </section>
      )}

      {eventInfo && (
        <section>
          <h4>Спонсоры</h4>
          <div className={styles.partnerSlider}>
            <Swiper {...eventSliderOptions} ref={swiperRef}>
              {eventInfo?.partners?.map((slideItem, idx) => (
                <SwiperSlide key={idx} className={styles.partnerSlide}>
                  <div className={styles.partnerCard} key={slideItem.id_partner}>
                    <a href={slideItem.itemlink} className={styles.partnersLink}>
                      {/*
												<img
												src={slideItem.mainphoto[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
												*/}
                      <p>{slideItem.title}</p>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderBtns
              className={styles.partnersSliderBtns}
              $topPosition='82%'
              $btnsSpacing={breakPoint === 'sliderBtnsPoint' ? 'calc(100% + 50px)' : '90%'}
              swiperRef={swiperRef}
              color='#5C5C5C'
            />
          </div>
        </section>
      )}

      {!!eventInfo?.faq?.length ? (
        <section className={styles.faqSection}>
          <h4>Часто задаваемые вопросы</h4>
          <div className={styles.faqList}>
            {eventInfo?.faq?.map((faqEl, idx) => (
              <AccordionItem
                className={styles.eventFaqItem}
                key={idx}
                trigger={faqEl.title}
                content={faqEl.content}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className={styles.faqSection}>
          <h4>Часто задаваемые вопросы</h4>
          <div className={styles.faqList}>
            {mockFaq?.map((faqEl, idx) => (
              <AccordionItem
                className={styles.eventFaqItem}
                key={idx}
                trigger={faqEl.title}
                content={faqEl.content}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <DetailedAside
          className={styles.footerSection}
          brandImg={eventInfo?.brandImg}
          genPartnerImg={eventInfo?.partnerImg}
          partners={eventInfo?.partners}
          organizers={eventInfo?.organizerLinks}
          documents={eventInfo?.documents}
          links={eventInfo?.relatedLinks}
        />
      </section>
    </div>
  )
}

