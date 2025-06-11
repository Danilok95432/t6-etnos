import { type FC, useEffect, useState } from 'react'
type SlideNextSvgProps = {
	variant?: 'main' | 'sm' | 'gallery' | 'main-obj-slider'
	color?: string
}

export const SlideNextSvg: FC<SlideNextSvgProps> = ({
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
					d='M17.2323 20.3959C17.2323 20.5736 17.1379 20.8403 16.9492 20.9292L11.2868 26.261C11.0037 26.5276 10.4375 26.5276 10.06 26.261C9.77688 25.9944 9.77688 25.4612 10.06 25.1057L15.1561 20.307L10.06 15.5084C9.77688 15.2418 9.77688 14.7086 10.06 14.3532C10.3431 14.0866 10.9093 14.0866 11.2868 14.3532L16.9492 19.685C17.1379 19.9516 17.2323 20.2182 17.2323 20.3959Z'
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
					d='M19 19.6082C19 19.8248 18.885 20.1498 18.6549 20.2581L11.754 26.7563C11.4089 27.0812 10.7188 27.0812 10.2588 26.7563C9.91374 26.4314 9.91374 25.7815 10.2588 25.3483L16.4696 19.4999L10.2588 13.6515C9.91374 13.3266 9.91374 12.6769 10.2588 12.2437C10.6038 11.9188 11.2939 11.9188 11.754 12.2437L18.6549 18.7419C18.885 19.0668 19 19.3916 19 19.6082Z'
					fill={color}
				/>
			</svg>
		)

	return (
		<svg width='9' height='15' viewBox='0 0 9 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0.796068 14.3783C0.401311 13.9878 0.401311 13.3546 0.796068 12.9641L6.05962 7.6712L0.796068 2.37831C0.401311 1.98779 0.401311 1.35462 0.796068 0.964096C1.19083 0.573572 1.83085 0.573572 2.22561 0.964096L8.20393 6.9641C8.59869 7.35462 8.59869 7.98779 8.20393 8.37831L2.22561 14.3783C1.83085 14.7688 1.19083 14.7688 0.796068 14.3783Z'
				fill={color}
			/>
		</svg>
	)
}
