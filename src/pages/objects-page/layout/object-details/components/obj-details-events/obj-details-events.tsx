import { type FC, type RefObject, useRef } from 'react'
import { type SwiperRef } from 'swiper/react/swiper-react'
import cn from 'classnames'

import { useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { EventCard } from 'src/components/event-card/event-card'
import { eventsSliderOptions } from './consts'
import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'

import styles from './index.module.scss'

export const ObjDetailsEvents: FC = () => {
	const { id } = useParams()

	const { data: objectData } = useGetObjectByIdQuery(id ?? '')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	if (!objectData?.events?.length) return null
	return (
		<section className={styles.objEventsSection}>
			<h4>События</h4>

			<div className={cn(styles.objEventsSlider, 'slider-with-btns ')}>
				<Swiper {...eventsSliderOptions} ref={swiperRef}>
					{objectData.events.map((slideItem, idx) => (
						<SwiperSlide className={styles.objEventSlide} key={idx}>
							<EventCard className={styles.objEventCard} {...slideItem} />
						</SwiperSlide>
					))}
				</Swiper>
				<SliderBtns $topPosition='48%' $btnsSpacing='calc(100% + 40px)' swiperRef={swiperRef} />
			</div>
		</section>
	)
}
