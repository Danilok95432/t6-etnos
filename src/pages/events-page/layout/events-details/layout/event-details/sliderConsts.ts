import { type SwiperProps } from 'swiper/react/swiper-react'

import { DisplayBreakpoints } from 'src/helpers/consts'

export const eventSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 25,
	grabCursor: true,
	breakpoints: {
		[DisplayBreakpoints.Xs]: {
			slidesPerView: 3,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 8,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 10,
		},
	},
}
