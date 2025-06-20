import { RefObject, useMemo, useRef } from 'react'
import styles from './index.module.scss'
import { CardNewsItem } from 'src/types/news'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { useGetHomeNewsQuery } from 'src/store/home/home.api'
import { NewsCard } from 'src/components/news-card/news-card'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { newsSliderOptions } from './consts'
import { MobileList } from 'src/components/mobile-list/mobile-list'

export const EtnosportNews = () => {
  const { data: newsList } = useGetHomeNewsQuery(null)
  const breakpoint = useBreakPoint()
  const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

  const { mainNews, topNews } = useMemo(() => {
    if (!newsList) {
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

      if (breakpoint === 'breakPoint') {
        topNewsItems = filtered.slice(0, 1)
      } else if (breakpoint === 'ShortLg' || breakpoint === 'L') {
        topNewsItems = []
      } else if (breakpoint === 'S') {
        mainNewsItem = null
        topNewsItems = []
      } else {
        topNewsItems = filtered.slice(0, 2)
      }
    } else {
      topNewsItems = sortedNews.slice(0, 5)
    }

    return { mainNews: mainNewsItem, topNews: topNewsItems }
  }, [newsList, breakpoint])

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
    <div className={styles.etnoNewsPage}>
      <h2>Новости</h2>
      {(breakpoint === 'L' || breakpoint === 'sliderBtnsPoint') && (
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
      {breakpoint === 'S' ? (
        <MobileList
          items={sliderNews ?? []}
          renderItem={NewsCard}
          classListItems={styles.etnosportNewsTab}
          defaultVisibleCount={3}
          classNameBtn={styles.showMoreBtnTab}
        />
      ) : (
        <>
          {sliderNews?.length > 0 && (
            <div className='slider-with-btns'>
              <Swiper {...newsSliderOptions} ref={swiperRef} className={styles.swiperSlider}>
                {sliderNews.map((newsEl, idx) => (
                  <SwiperSlide className={styles.newsSlide} key={idx}>
                    <NewsCard key={newsEl.id} {...newsEl} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <SliderBtns
                className={styles.newsSliderBtns}
                $topPosition='50%'
                $btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '97%'}
                swiperRef={swiperRef}
                color={'#5C5C5C'}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
