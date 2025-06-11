import { type FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type HighlightedTextProps = {
	className?: string
	text: string
	maxWidth: number
}

export const HighlightedText: FC<HighlightedTextProps> = ({ className, text, maxWidth }) => {
	const [lines, setLines] = useState<string[]>([])
	const tempRef = useRef<HTMLHeadingElement>(null)
	useEffect(() => {
		if (tempRef.current) {
			splitTextIntoLines(text, maxWidth)
		}
	}, [text, maxWidth])

	const splitTextIntoLines = (text: string, maxWidth: number) => {
		const words: string[] = text.split(' ')
		let currentLine = ''
		const linesArray: string[] = []

		const tempElement = tempRef.current
		if (!tempElement) return
		tempElement.textContent = ''

		words.forEach((word, index) => {
			const testLine = currentLine ? `${currentLine} ${word}` : word
			tempElement.textContent = testLine

			if (tempElement.offsetWidth > maxWidth) {
				linesArray.push(currentLine)
				currentLine = word
			} else {
				currentLine = testLine
			}

			if (index === words.length - 1) {
				linesArray.push(currentLine)
				tempElement.textContent = ''
			}
		})

		setLines(linesArray)
	}
	return (
		<h5 className={cn(styles.textWrapper, className)} style={{ maxWidth: `${maxWidth}px` }}>
			<div className={styles.templLine} ref={tempRef}></div>
			{lines.map((line, index) => (
				<span key={index}>{line}</span>
			))}
		</h5>
	)
}
