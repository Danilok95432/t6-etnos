import styled from 'styled-components'
import React, { type FC, type ReactNode } from 'react'

type StyledGridRowProps = {
	$margin?: string
	$gap?: string
	$alignItems?: string
	$template?: string
	$maxWidth?: string
	$padding?: string
	$borderBottom?: string
	children: ReactNode
} & React.CSSProperties

const StyledGridRow = styled.div<StyledGridRowProps>`
	margin: ${({ $margin }) => $margin ?? '0'};
	padding: ${({ $padding }) => $padding ?? '0'};
	border-bottom: ${({ $borderBottom }) => $borderBottom ?? 'none'};
	display: grid;
	gap: ${({ $gap }) => $gap ?? '0 10px'};
	max-width: ${({ $maxWidth }) => $maxWidth ?? '100%'};
	align-items: ${({ $alignItems }) => $alignItems ?? 'start'};
	grid-template: ${({ $template }) => $template ?? 'auto / 1fr 1fr'};
`

export const GridRow: FC<StyledGridRowProps> = ({ children, ...props }) => {
	return <StyledGridRow {...props}>{children}</StyledGridRow>
}
