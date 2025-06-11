import { type FC, type RefObject, useRef } from 'react'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import cn from 'classnames'

import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { Container } from 'src/UI/Container/Container'
import { useGetHomePostersQuery } from 'src/store/home/home.api'
import { posterSliderOptions } from './posterSliderOptions'
import { mainFormatDate } from 'src/helpers/utils'
import { ToggleLink } from 'src/components/toggle-link/toggle-link'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const PosterSection: FC = () => {
	const { data: posterData } = useGetHomePostersQuery(null)
	const breakpoint = useBreakPoint()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	return (
		<section className={cn(styles.posterSection, 'slider-with-btns')}>
			<Swiper className={styles.posterSlider} {...posterSliderOptions} ref={swiperRef}>
				{posterData?.map((slideItem, idx) => (
					<SwiperSlide key={idx}>
						<ToggleLink
							className={styles.slideItem}
							isExternal={slideItem.isExternal}
							link={slideItem.itemLink}
						>
							<div className={styles.slideItemWrapperImg}>
								<img
									src={slideItem.mainphoto[0]?.original}
									alt={slideItem.title}
									className={styles.slideItemImage}
									width={1920}
									height={646}
									loading='lazy'
								/>
							</div>
							<Container className={styles.posterInfoContainer}>
								<div className={styles.slideInfo}>
									<div className={styles.slideInfoInner}>
										<h1 className={styles.sliderInfoTitle}>{slideItem.title}</h1>
										<ul className={styles.sliderInfoList}>
											{slideItem?.date && (
												<li className={styles.sliderInfoItem}>
													{mainFormatDate(slideItem.date, "d MMMM yyyy 'года' в HH:mm")}
												</li>
											)}
											{slideItem?.location && (
												<li className={styles.sliderInfoItem}>{slideItem.location}</li>
											)}
										</ul>
									</div>
								</div>
							</Container>
						</ToggleLink>
					</SwiperSlide>
				))}
			</Swiper>
			<SliderBtns
				className={styles.posterSliderBtns}
				$topPosition='47%'
				$btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '90%'}
				swiperRef={swiperRef}
				color='#FFFFFFB5'
			/>
		</section>
	)
}
