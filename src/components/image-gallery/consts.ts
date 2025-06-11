import { type SwiperProps } from 'swiper/react/swiper-react'

import { DisplayBreakpoints } from 'src/helpers/consts'

export const gallerySliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 10,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 1,
		},
		[DisplayBreakpoints.ShortLg]: {
			slidesPerView: 3,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 4,
			spaceBetween: 15,
		},
		[DisplayBreakpoints.Xl]: {
			slidesPerView: 5,
			spaceBetween: 15,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 6,
			spaceBetween: 25,
		},
	},
}

export const galleryFullScreenSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 0,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
	},
}
