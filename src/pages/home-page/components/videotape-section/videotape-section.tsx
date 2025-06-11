import { type FC, type RefObject, useRef } from 'react'
import { type SwiperRef } from 'swiper/react/swiper-react'

import cn from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'

import { homeVideosSliderOptions } from 'src/pages/home-page/components/videotape-section/homeVideosSliderOptions'
import { Container } from 'src/UI/Container/Container'
import { AppRoute } from 'src/routes/main-routes/consts'
import { useGetHomeVideosQuery } from 'src/store/home/home.api'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { VideoCard } from 'src/components/video-card/video-card'

import { SliderBtns } from 'src/components/slider-btns/slider-btns'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const VideotapeSection: FC = () => {
	const { data: videos } = useGetHomeVideosQuery(null)
	const breakpoint = useBreakPoint()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	return (
		<section className={cn(styles.videotapeSection, '_bordered')}>
			<Container className={styles.videotapeTop}>
				<FlexRow className={styles.videotapeSectionRow}>
					<h2>Видеолента</h2>
					<MainButton as='route' to={AppRoute.Videos}>
						Все видео
					</MainButton>
				</FlexRow>
				<div>
					<Swiper {...homeVideosSliderOptions} ref={swiperRef}>
						{videos?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<VideoCard key={slideItem.id} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.videoSliderBtns}
						$topPosition='52%'
						$btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '97%'}
						swiperRef={swiperRef}
						color={'#5C5C5C'}
					/>
				</div>
			</Container>
		</section>
	)
}
