import { type SwiperProps } from 'swiper/react/swiper-react'

import { DisplayBreakpoints } from 'src/helpers/consts'

export const homeObjectsSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 25,
	grabCursor: true,
	breakpoints: {
		[DisplayBreakpoints.Xs]: {
			slidesPerView: 1,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 1,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 1,
		},
	},
}
