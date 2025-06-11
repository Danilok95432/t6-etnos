import { type FC, type PropsWithChildren } from 'react'

import { createPortal } from 'react-dom'
import cn from 'classnames'

import { CloseSvg } from 'src/UI/icons/closeSVG'

import styles from './index.module.scss'

type ModalProps = PropsWithChildren<{
	active: boolean
	className?: string
	setActive?: (arg: boolean) => void
	customClose?: () => void
}>

export const Modal: FC<ModalProps> = ({ active, setActive, children, className, customClose }) => {
	const handleCloseModal = () => {
		if (customClose) {
			customClose()
			return
		}

		if (setActive) {
			setActive(false)
		}
	}

	if (!active) {
		return null
	}

	return createPortal(
		<div className={cn(styles.modal, { [styles.active]: active })} onClick={handleCloseModal}>
			<div className={cn(styles.modalContent, className)} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeBtn} type='button' onClick={handleCloseModal}>
					<CloseSvg />
				</button>

				{children}
			</div>
		</div>,
		document.getElementById('modal') as HTMLElement,
	)
}
