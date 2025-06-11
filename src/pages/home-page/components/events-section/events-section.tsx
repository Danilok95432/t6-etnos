import { type FC, type RefObject, useRef } from 'react'
import { type SwiperRef } from 'swiper/react/swiper-react'

import cn from 'classnames'

import { Container } from 'src/UI/Container/Container'
import { useGetHomeEventsQuery } from 'src/store/home/home.api'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { AppRoute } from 'src/routes/main-routes/consts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { EventCard } from 'src/components/event-card/event-card'
import { eventsSliderOptions } from 'src/pages/home-page/components/events-section/eventsSliderOptions'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const EventsSection: FC = () => {
	const { data: homeEvents } = useGetHomeEventsQuery(null)
	const breakpoint = useBreakPoint()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	return (
		<section className={cn(styles.eventsSection, '_bordered')}>
			<Container>
				<FlexRow className={styles.eventsSectionRow}>
					<h2 className={styles.sectionTitle}>События</h2>
					<MainButton as='route' to={AppRoute.Events}>
						Все события
					</MainButton>
				</FlexRow>

				<div>
					<Swiper {...eventsSliderOptions} ref={swiperRef}>
						{homeEvents?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<EventCard className={styles.homeEventCard} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>

					<SliderBtns
						className={styles.eventsSliderBtns}
						$topPosition='54%'
						$btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '97%'}
						swiperRef={swiperRef}
						color={'#5C5C5C'}
					/>
				</div>
			</Container>
		</section>
	)
}
