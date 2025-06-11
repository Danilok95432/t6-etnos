import React, { type FC, type ReactNode } from 'react'
import styled from 'styled-components'

type SimpleLinkStyleProps = {
	$margin?: string
	$fontSize?: string
	$fontWeight?: string
	$lineHeight?: string
	$fontStyle?: string
	$maxWidth?: string
	$color?: string
}

type SimpleLinkProps = {
	title: ReactNode
	link?: string
	className?: string
	isEmail?: boolean
	newWindow?: boolean
} & SimpleLinkStyleProps

const StyledCustomLink = styled.a<SimpleLinkStyleProps>`
	margin: ${({ $margin }) => $margin ?? '0'};
	font-size: ${({ $fontSize }) => $fontSize ?? '16px'};
	font-weight: ${({ $fontWeight }) => $fontWeight ?? '400'};
	line-height: ${({ $lineHeight }) => $lineHeight ?? '1.2'};
	font-style: ${({ $fontStyle }) => $fontStyle ?? 'normal'};
	max-width: ${({ $maxWidth }) => $maxWidth ?? 'initial'};
	color: ${({ $color }) => $color ?? '#015DB9'};
`

export const SimpleLink: FC<SimpleLinkProps> = ({
	title,
	link,
	isEmail,
	className,
	newWindow = true,
	...props
}) => {
	return (
		<StyledCustomLink
			href={isEmail ? `mailto:${link}` : link}
			className={className}
			target={newWindow ? '_blank' : ''}
			{...props}
		>
			{title}
		</StyledCustomLink>
	)
}
