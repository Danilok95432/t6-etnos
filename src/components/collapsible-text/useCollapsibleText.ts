import { useEffect, useState } from 'react'

type UseComparatorProps = {
	ref: React.MutableRefObject<HTMLDivElement | null>
	lineClamp: number
}

export const useCollapsibleText = ({ ref, lineClamp }: UseComparatorProps): boolean => {
	const [isOverflowing, setIsOverflowing] = useState(false)

	useEffect(() => {
		if (!ref.current) {
			return
		}
		const childElement = ref.current.firstChild as HTMLDivElement

		if (childElement) {
			const { clientHeight } = childElement
			const lineHeight = parseFloat(getComputedStyle(childElement).lineHeight)
			const maxHeight = lineClamp * lineHeight

			setIsOverflowing(clientHeight > maxHeight)
		}
	}, [ref, lineClamp])

	return isOverflowing
}
