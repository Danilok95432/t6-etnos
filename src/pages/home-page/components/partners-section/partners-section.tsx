import { type RefObject, useRef, type FC } from 'react'

import { Container } from 'src/UI/Container/Container'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { AppRoute } from 'src/routes/main-routes/consts'
import { useGetHomePartnersQuery } from 'src/store/home/home.api'
import { type SwiperRef, Swiper, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { homePartnersSliderOptions } from './homePartnersSliderOptions'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const PartnersSection: FC = () => {
	const { data: partners } = useGetHomePartnersQuery(null)
	const breakpoint = useBreakPoint()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	return (
		<section className={styles.partnersSection}>
			<Container>
				<FlexRow className={styles.partnersTop}>
					<h2>Партнеры</h2>
					<MainButton as='route' to={AppRoute.Home}>
						Все партнеры
					</MainButton>
				</FlexRow>
				<div className={styles.partnerSlider}>
					<Swiper {...homePartnersSliderOptions} ref={swiperRef}>
						{partners?.map((slideItem, idx) => (
							<SwiperSlide key={idx} className={styles.partnerSlide}>
								<div className={styles.partnerCard} key={slideItem.id}>
									<a href={slideItem.link} className={styles.partnersLink}>
										<img
											src={slideItem.mainphoto[0]?.thumbnail}
											alt='partner'
											width={188}
											height={105}
											loading='lazy'
										/>
									</a>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.partnersSliderBtns}
						$topPosition='82%'
						$btnsSpacing={breakpoint === 'sliderBtnsPoint' ? '1400px' : '90%'}
						swiperRef={swiperRef}
						color='#5C5C5C'
					/>
				</div>
			</Container>
		</section>
	)
}
