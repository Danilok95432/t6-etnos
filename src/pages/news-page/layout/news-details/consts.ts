import { type SwiperProps } from 'swiper/react/swiper-react'

import { DisplayBreakpoints } from 'src/helpers/consts'

export const gallerySliderNewsDetailsOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 10,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1,
			spaceBetween: 4,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 1,
			spaceBetween: 4,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 1,
			spaceBetween: 4,
		},
		[DisplayBreakpoints.Xl]: {
			slidesPerView: 4,
			spaceBetween: 4,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 5,
			spaceBetween: 4,
		},
	},
}
