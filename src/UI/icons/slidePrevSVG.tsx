import { type FC, useEffect, useState } from 'react'

type SlidePrevSvgProps = {
	variant?: 'main' | 'sm' | 'gallery' | 'main-obj-slider'
	color?: string
}

export const SlidePrevSvg: FC<SlidePrevSvgProps> = ({
	variant = 'main',
	color: propColor = '#ffffff',
}) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 440)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	let color = propColor

	if (variant !== 'main-obj-slider') color = isSmallScreen ? '#ffffff' : propColor

	if (variant === 'gallery')
		return (
			<svg
				width='28'
				height='40'
				viewBox='0 0 28 40'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M10.463 19.6041C10.463 19.4264 10.5574 19.1597 10.7462 19.0708L16.4085 13.739C16.6916 13.4724 17.2578 13.4724 17.6353 13.739C17.9184 14.0056 17.9184 14.5388 17.6353 14.8943L12.5392 19.693L17.6353 24.4916C17.9184 24.7582 17.9184 25.2914 17.6353 25.6468C17.3522 25.9134 16.786 25.9134 16.4085 25.6468L10.7462 20.315C10.5574 20.0484 10.463 20.0484 10.463 19.6041Z'
					fill={color}
				/>
			</svg>
		)

	if (variant === 'sm')
		return (
			<svg
				width='28'
				height='40'
				viewBox='0 0 28 40'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M10 20.3918C10 20.1752 10.115 19.8502 10.3451 19.7419L17.246 13.2437C17.5911 12.9188 18.2812 12.9188 18.7412 13.2437C19.0863 13.5686 19.0863 14.2185 18.7412 14.6517L12.5304 20.5001L18.7412 26.3485C19.0863 26.6734 19.0863 27.3231 18.7412 27.7563C18.3962 28.0812 17.7061 28.0812 17.246 27.7563L10.3451 21.2581C10.115 20.9332 10 20.6084 10 20.3918Z'
					fill={color}
				/>
			</svg>
		)

	return (
		<svg width='9' height='15' viewBox='0 0 9 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.20393 0.964097C8.59869 1.35462 8.59869 1.98779 8.20393 2.37831L2.94038 7.6712L8.20393 12.9641C8.59869 13.3546 8.59869 13.9878 8.20393 14.3783C7.80917 14.7688 7.16915 14.7688 6.77439 14.3783L0.796068 8.37831C0.401311 7.98779 0.401311 7.35462 0.796068 6.9641L6.77439 0.964097C7.16915 0.573573 7.80917 0.573573 8.20393 0.964097Z'
				fill={color}
			/>
		</svg>
	)
}
