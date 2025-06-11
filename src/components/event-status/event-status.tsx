import { type FC } from 'react'

import cn from 'classnames'

import { CustomText } from '../custom-text/custom-text'
import { EventStatusCancelSVG } from 'src/UI/icons/eventStatusCancelSVG'
import { EventStatusNowSVG } from 'src/UI/icons/eventStatusNowSVG'
import { EventStatusWillBeSVG } from 'src/UI/icons/eventStatusWillBeSVG'
import { EventStatusPassedSVG } from 'src/UI/icons/eventStatusPassedSVG'

import styles from './index.module.scss'

type EventStatusProps = {
	statusCode?: 'cancel' | 'current' | 'future' | 'finished'
	className?: string
}

export const EventStatus: FC<EventStatusProps> = ({ statusCode, className }) => {
	switch (statusCode) {
		case 'cancel':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusCancelSVG />
					<CustomText $fontSize='16px' $padding='0 0 0 28px'>
						Отменено
					</CustomText>
				</div>
			)
		case 'current':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusNowSVG />
					<CustomText $fontSize='16px' $padding='0 0 0 10px'>
						Идет сейчас
					</CustomText>
				</div>
			)
		case 'future':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusWillBeSVG />
					<CustomText $fontSize='16px' $padding='0 0 0 10px'>
						Предстоит
					</CustomText>
				</div>
			)
		case 'finished':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusPassedSVG />
					<CustomText $fontSize='16px' $padding='0 0 0 10px'>
						Прошло
					</CustomText>
				</div>
			)
		default:
			return null
	}
}
