import React, { type FC, type PropsWithChildren } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'
import styled from 'styled-components'

type PageContentProps = PropsWithChildren<{
	$padding?: string
	$maxWidth?: string
	$background?: string
	$margin?: string
	$minHeight?: string
	$borderRadius?: string
}>

const StyledPageContent = styled.div<PageContentProps>`
	padding: ${({ $padding }) => $padding ?? '42px 35px 70px 50px'};
	margin: ${({ $margin }) => $margin ?? '0 0 100px 0'};
	max-width: ${({ $maxWidth }) => $maxWidth ?? '100%'};
	min-height: ${({ $minHeight }) => $minHeight ?? '1500px'};
	background: ${({ $background }) => $background ?? '#ffffff'};
	border-radius: ${({ $borderRadius }) => $borderRadius ?? '0'};
	overflow: hidden;
	@media (max-width: 768px) {
		padding: 30px 20px;
	}
`

export const PageContent: FC<React.HTMLAttributes<HTMLDivElement> & PageContentProps> = (props) => {
	return <StyledPageContent {...props} className={cn(styles.pageContent, props.className)} />
}
