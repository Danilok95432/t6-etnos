import { Pagination } from 'swiper'
import { type SwiperProps } from 'swiper/react'

export const posterSliderOptions: SwiperProps = {
	slidesPerView: 1,
	grabCursor: true,
	spaceBetween: 5,
	loop: true,
	pagination: {
		clickable: true,
		renderBullet: (index, className) => {
			return `<span class="${className}"></span>`
		},
	},
	modules: [Pagination],
}
