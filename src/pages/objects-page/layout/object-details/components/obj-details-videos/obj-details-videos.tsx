import { type FC, type RefObject, useRef } from 'react'
import { type SwiperRef } from 'swiper/react/swiper-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'

import { videotapeSliderOptions } from './consts'
import { useGetObjectByIdQuery } from 'src/store/objects/objects.api'
import { VideoCard } from 'src/components/video-card/video-card'

import styles from './index.module.scss'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'

export const ObjDetailsVideos: FC = () => {
	const { id } = useParams()

	const { data: objectData } = useGetObjectByIdQuery(id ?? '')

	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	if (!objectData?.videos?.length) return null

	return (
		<section className={cn(styles.videotapeSection, '_bordered')}>
			<h4>Видеолента</h4>

			<div className={cn(styles.objSwiperWrapper, 'slider-with-btns')}>
				<Swiper className={styles.videotapeSlider} {...videotapeSliderOptions} ref={swiperRef}>
					{objectData.videos.map((slideItem, idx) => (
						<SwiperSlide key={idx}>
							<VideoCard key={slideItem.id} {...slideItem} />
						</SwiperSlide>
					))}
				</Swiper>
				<SliderBtns $topPosition='40%' $btnsSpacing='calc(100% + 40px)' swiperRef={swiperRef} />
			</div>
		</section>
	)
}
