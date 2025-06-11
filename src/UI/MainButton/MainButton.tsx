import React, { type FC, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import classNames from 'classnames'

import styles from './index.module.scss'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type ButtonComponentProps = {
	as?: 'button' | 'link' | 'route'
	children?: ReactNode
	svgNode?: ReactNode
	classname?: string
	$variant?: 'primary' | 'light' | 'show'
}

export const MainButton: FC<ButtonComponentProps & (ButtonProps | AnchorProps | LinkProps)> = ({
	children,
	className,
	as = 'button',
	$variant = 'primary',
	...props
}) => {
	const containerClassName = classNames(
		styles.mainBtnContainer,
		styles[`mainBtnContainer__${$variant}`],
		className,
	)

	if (as === 'button') {
		return (
			<button className={containerClassName} {...(props as ButtonProps)}>
				{children}
			</button>
		)
	}

	if (as === 'link') {
		return (
			<a className={containerClassName} {...(props as AnchorProps)}>
				{children}
			</a>
		)
	}

	if (as === 'route') {
		return (
			<Link className={containerClassName} {...(props as LinkProps)}>
				{children}
			</Link>
		)
	}
	return null
}
