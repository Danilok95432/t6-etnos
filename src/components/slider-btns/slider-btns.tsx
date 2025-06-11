import React, { type FC, type RefObject } from 'react'
import { type SwiperRef } from 'swiper/react'
import styled from 'styled-components'

import { SlidePrevSvg } from 'src/UI/icons/slidePrevSVG'
import { SlideNextSvg } from 'src/UI/icons/slideNextSVG'

import cn from 'classnames'

type SliderBtnsProps = {
	$topPosition?: string
	$btnsSpacing?: string
	$variant?: 'main' | 'sm' | 'gallery' | 'main-obj-slider'
	color?: string
}

type SliderProps = {
	swiperRef: RefObject<SwiperRef>
	className?: string
}

const StyledSliderBtns = styled.div<SliderBtnsProps>`
	display: flex;
	transition: all 0.3s;
	justify-content: space-between;
	position: absolute;
	left: 50%;
	z-index: 1;
	height: 0;
	transform: translate(-50%, -50%);
	width: ${({ $btnsSpacing }) => $btnsSpacing ?? '100%'};
	top: ${({ $topPosition }) => $topPosition ?? '0'};
	opacity: 1;
	visibility: visible;

	button {
		height: min-content;
		transform: translateY(-50%);

		&:hover {
			svg rect {
				fill-opacity: ${({ $variant }) => {
					if ($variant === 'sm') return '1'
					return '0.4'
				}};
			}
		}
	}
`

export const SliderBtns: FC<SliderBtnsProps & SliderProps> = ({
	swiperRef,
	className,
	$variant = 'main',
	color = '#ffffff',
	...props
}) => {
	const handlePrev = () => {
		swiperRef.current?.swiper.slidePrev()
	}

	const handleNext = () => {
		swiperRef.current?.swiper.slideNext()
	}
	return (
		<StyledSliderBtns className={cn(className, 'slider-nav-btns')} $variant={$variant} {...props}>
			<button type='button' onClick={handlePrev}>
				<SlidePrevSvg variant={$variant} color={color} />
			</button>
			<button type='button' onClick={handleNext}>
				<SlideNextSvg variant={$variant} color={color} />
			</button>
		</StyledSliderBtns>
	)
}
