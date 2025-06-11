import { type FC, type RefObject, useRef } from 'react'
import type { SwiperRef } from 'swiper/react/swiper-react'
import { type MonthFilterItem } from 'src/types/global'

import { uid } from 'react-uid'
import { Swiper, SwiperSlide } from 'swiper/react'
import { isSameMonth } from 'date-fns'
import cn from 'classnames'

import { SliderBtns } from 'src/components/slider-btns/slider-btns'
import { mainFormatMonthDate } from 'src/helpers/utils'
import { monthsSliderOptions } from './consts'

import styles from './index.module.scss'

type MonthsSliderProps = {
	activeMonth: string
	changeActiveMonth: (arg: string) => void
	monthsList: MonthFilterItem[]
	allMonthTitle: string
}

export const MonthsFilterSlider: FC<MonthsSliderProps> = ({
	activeMonth,
	changeActiveMonth,
	monthsList,
	allMonthTitle,
}) => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	const handleChangeMonth = (date: string, isActive: boolean) => {
		if (isActive) {
			changeActiveMonth(date)
		}
	}

	if (!monthsList) return
	return (
		<div className={styles.monthsFilterWrapper}>
			<button
				className={cn(styles.allMonthsBtn, {
					[styles._activeMonthsBtn]: activeMonth === '0',
				})}
				onClick={() => changeActiveMonth('0')}
				type='button'
			>
				{allMonthTitle}
			</button>
			<Swiper className={styles.monthsFilterSlider} {...monthsSliderOptions} ref={swiperRef}>
				{monthsList?.map(({ date, isActive }) => (
					<SwiperSlide
						className={cn(styles.monthSlide, {
							[styles._disableSlide]: !isActive,
							[styles._activeSlide]: isSameMonth(new Date(date), new Date(activeMonth)),
						})}
						key={uid(date)}
						onClick={() => handleChangeMonth(String(date), isActive)}
					>
						<p>{mainFormatMonthDate(date, 'LLLL')}</p>
					</SwiperSlide>
				))}
				<SliderBtns
					className={styles.monthsSliderNavBtns}
					$topPosition='55%'
					$btnsSpacing='calc(100% + 40px)'
					swiperRef={swiperRef}
					$variant='sm'
					color='#000000'
				/>
			</Swiper>
		</div>
	)
}
